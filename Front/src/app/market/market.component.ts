import { Component } from '@angular/core';
import { product } from '../model/product';
import { ProductService } from '../services/product.service';
import { Cart } from '../model/Cart';
import { PanierComponent } from '../panier/panier.component';
import Swal from 'sweetalert2';
import { CartService } from '../services/cart.service';
import { Message } from '../model/Message';
import { send } from 'process';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent {
  userMessage: string = '';
  thread_id: string = '';
  messages: any[] = [];
  
  products: product[] = [];
  selectedTab: number = 0;
  dialogRef: any;
  dialog: any;
  constructor(private productService: ProductService,
    private cartService: CartService) { }
  ngOnInit(): void {
    this.loadProduct();
    this.loadCarts();
    console.log(this.thread_id);
  }

  loadProduct(): void {
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products;
    })
  }
  protein: string = "protein";
  clothes: string = "clothes";
  proteinBars: string = "proteinBars";
  accessoire: string = "accessoire";

  selectedTabTo(category: string) {
    this.products = [];
    this.selectedTab = 1;
    this.productService.getProductByCategory(category).subscribe((products: any) => {
      this.products = products;
    })
  }

  isOpen = false;
  opens() {
    this.isOpen = !this.isOpen;
  }

  selectedTabToReturn() {
    this.loadProduct();
    this.selectedTab = 0;
  }

  carts: Cart[] = [];
  total: number = 0;
  loadCarts(): void {
    this.cartService.getCartss().subscribe((data: any) => {
      this.total = 0;
      this.carts = data as Cart[];
      console.log(this.carts);
      for (let cart of this.carts) {
        this.total += (cart.price * cart.quantity);
      }
    
      localStorage.setItem('total', this.total.toString())
    })
  }

  addTocart(product: product | undefined) {
    if (product) {
      let cart: Cart;
      let existingCart = this.carts.find(cart => cart.product?.nameProd === product.nameProd);

      if (existingCart) {
        existingCart.quantity++;
        cart = existingCart;
        if (existingCart.idCard) {
          this.cartService.deleteCart(existingCart.idCard).subscribe((data: any) => {
            console.log("Cart deleted");
            this.cartService.createCart(cart).subscribe((data: any) => {
              console.log("Added to cart");
              this.loadCarts();
              localStorage.setItem('total', this.total.toString())
              Swal.fire({
                icon: 'success',
                title: 'Produit ajouté au panier',
                text: 'Le produit a été ajouté à votre panier avec succès',
                showConfirmButton: false,
                timer: 1500
              });
            });
          });

        }
      } else {
        cart = {
          product: product,
          quantity: 1,
          price: product.priceProd
        };
        this.cartService.createCart(cart).subscribe((data: any) => {
          localStorage.setItem('total', this.total.toString())
          console.log("Added to cart");
          location.reload();
        });
      }
    }
  }

  deletecard(cart: Cart) {
    if (cart.idCard) {
      this.cartService.deleteCart(cart.idCard).subscribe((data: any) => {
        location.reload();
        localStorage.setItem('total', '0')

        console.log("Cart deleted");
      });
    }
  }
  sendChatBot() {
    if (this.userMessage.trim() === '') {
      return;
    }
    if (this.thread_id === '') {
      this.cartService.getChatBotThread().subscribe((data: any) => {
        this.thread_id = data.thread_id;
        this.sendmsg();
      });
    } else {
      this.sendmsg();
    }
  }

  loading: boolean = false; 

  sendmsg() {
    this.loading = true;
    //timeout to wait for bot response before sending another message and disabel the send button meanwhile
    setTimeout(() => {
      this.messages.push({ "sender": "user", "message": this.userMessage });
      let message = {
        "thread_id": this.thread_id,
        "question": this.userMessage
      };
      this.userMessage = '';
      this.cartService.sendMessageToBot(message).subscribe((data: any) => {
        this.messages.push({ "sender": "bot", "message": data.response });
        this.loading = false;
        return;
      });
    }, 5000);
 
  }
}

