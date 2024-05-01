import { Component } from '@angular/core';
<<<<<<< HEAD
import { product } from '../model/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../model/Cart';
import Swal from 'sweetalert2';
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent{
<<<<<<< HEAD
  
  products: product[]=[];
  selectedTab: number = 0;
  constructor(private productService: ProductService,
    private cartService: CartService) {}
  ngOnInit(): void {
    this.loadProduct();
    this.loadCarts();
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

  selectedTabTo(category: string){
    this.products = [];
    this.selectedTab = 1;
    this.productService.getProductByCategory(category).subscribe((products: any) => {
      this.products = products;
    })
  }

  isOpen = false;
  opens(){
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
      this.carts = data as Cart [];
      console.log(this.carts);
      for (let cart of this.carts) {
        this.total += (cart.price* cart.quantity);
    }
        })
  }

  addTocart(product: product | undefined) {
    if (product) {
        let cart: Cart;
        let existingCart = this.carts.find(cart => cart.product?.nameProd === product.nameProd);

        if (existingCart) {
          existingCart.quantity++;
          cart = existingCart;
          if(existingCart.idCard){
            this.cartService.deleteCart(existingCart.idCard).subscribe((data: any) => {
                console.log("Cart deleted");
                this.cartService.createCart(cart).subscribe((data: any) => {
                  console.log("Added to cart");
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
              console.log("Added to cart");
              location.reload();
          });
        }
    }
}

deletecard(cart: Cart){
  if(cart.idCard) {
  this.cartService.deleteCart(cart.idCard).subscribe((data: any) => {
    location.reload();
    console.log("Cart deleted");
  });
  }
  }
  }

=======
}
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
