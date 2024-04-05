import { Component } from '@angular/core';
import { product } from '../model/product';
import { ProductService } from '../services/product.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products: product[]=[];
  updateForm: FormGroup;

  authToken: string | null | undefined;


  constructor(private productService: ProductService ,
              private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      nameProd: ['', Validators.required],
      priceProd: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]],
      imageProd: ['', Validators.required],
      categorie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products; // Initially, filteredProducts is the same as all products
      },
      error: (error) => console.error('Error loading products', error)
    });
  }

  filteredProducts: product[] = [];
  error: string | null = null;
  searchTerm: string = '';
  searchProduct(): void {
    const id = Number(this.searchTerm);
    if (!isNaN(id) && id !== 0) {
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.filteredProducts = [product]; // Display only the searched product
          this.error = null;
        },
        error: () => {
          this.error = 'Product not found';
          this.filteredProducts = [];
        }
      });
    } else {
      this.error = 'Please enter a valid product ID';
      this.filteredProducts = [];
    }
  }

  setAuthToken(token: string | null): void {
    this.authToken = token;
  }


  deleteProduct(idProduct: number): void {
    this.productService.deleteProduct(idProduct).subscribe(
      () =>
      {
        // Call loadProduct directly to refresh the list
        this.loadProduct();
      },
      error => {
        console.error('Error occurred while deleting product', error);
      }
    );



}
sortColumn: keyof product | null = null; // Initialize to an empty string
  sortDirection: 'asc' | 'desc' = 'asc'; // Initialize to ascending by default

  sort(property: keyof product): void {
    if (property === this.sortColumn) {
      // If the same column is clicked again, toggle the sorting direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, reset the sorting direction to ascending
      this.sortDirection = 'asc';
    }

    // Update the sortColumn to the clicked column
    this.sortColumn = property;

    this.filteredProducts.sort((a, b) => {
      const valA = a[property];
      const valB = b[property];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        return this.sortDirection === 'asc' ? valA - valB : valB - valA;
      } else {
        return 0; // No sorting for other types
      }
    });
  }

  generatePDF(): void {
    const doc = new jsPDF();
  
    // Titre du PDF
    doc.text('Liste des produits', 10, 10);
  
    // Tableau de produits
    let y = 20; // Position Y pour commencer le tableau
    this.products.forEach((prod, index) => {
      const productDetails = `${prod.nameProd} - ${prod.priceProd} - ${prod.imageProd} - ${prod.categorie}`;
      doc.text(productDetails, 10, y + index * 10);
    });
  
    // Sauvegarde du PDF
    doc.save('liste_produits.pdf');
  }

}
