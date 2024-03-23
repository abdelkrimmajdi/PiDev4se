import { Component } from '@angular/core';
import { product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products: product[]=[];


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  filteredProducts: product[] = []; // Tableau des repas filtrés
  error: string | null = null;
  searchTerm: string = '';

  searchProduct(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredProducts = this.products.filter(product =>
        product.nameProd.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products; // Si le terme de recherche est vide, afficher tous les repas
    }
  }




  deleteProduct(IdProduct: number): void {
    this.productService.deleteProduct(IdProduct).subscribe(() => {
      this.products = this.products.filter(product => product.IdProduct !== IdProduct);
    });
  }
  

}
