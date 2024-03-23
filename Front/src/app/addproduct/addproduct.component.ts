import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service'; // Assurez-vous que le chemin d'importation est correct
import { product } from '../model/product'; // Assurez-vous que le chemin d'importation est correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent {
  productForm = new FormGroup({
    nameProd: new FormControl('', [Validators.required]),
    priceProd: new FormControl('', [Validators.required]),
    categorie: new FormControl('', [Validators.required]),
    imageProd: new FormControl('', [Validators.required]),
  });

  constructor(private ProductService: ProductService, private formBuilder: FormBuilder, private router: Router) { }

  save() {
    console.log(this.productForm.value);
    this.ProductService.createProduct(this.productForm.value as any).subscribe(
      () => this.router.navigateByUrl('/product-list') // Assurez-vous que l'URL est correcte
    );
  }

  reset() {
    this.productForm.reset();
  }
  selectedImage: any;
 
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  



}
