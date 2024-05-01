import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service'; // Assurez-vous que le chemin d'importation est correct
import { product } from '../model/product'; // Assurez-vous que le chemin d'importation est correct
import { Router } from '@angular/router';
<<<<<<< HEAD
import { ReactiveFormsModule } from '@angular/forms';
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a

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
<<<<<<< HEAD
      () => this.router.navigateByUrl('/admin/product') // Assurez-vous que l'URL est correcte
=======
      () => this.router.navigateByUrl('/product-list') // Assurez-vous que l'URL est correcte
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
    );
  }

  reset() {
    this.productForm.reset();
<<<<<<< HEAD
    this.selectedImage = null;
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
  }
  selectedImage: any;
 
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
<<<<<<< HEAD
        this.productForm.patchValue({
          imageProd: e.target.result.split(',')[1]
        });
=======
>>>>>>> 4095e4be584b28adb5ad3d57622c43f1b6596c3a
      };
      reader.readAsDataURL(file);
    }
  }

  



}
