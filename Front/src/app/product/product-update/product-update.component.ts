import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html'})
export class ProductUpdateComponent implements OnInit {
  updateForm: FormGroup;
  productId: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      nameProd: ['', Validators.required],
      priceProd: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      imageProd: [''],
      categorie: ['', Validators.required],
    });
    this.productId = 0;
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.productId).subscribe(product => {
      this.updateForm.patchValue(product);
    });
  }

  onSubmit(): void {
    console.log('Submit button clicked!');

    if (this.updateForm.valid) {
      this.productService.updateProduct(this.productId, this.updateForm.value).subscribe({
        next: (response) => {
          console.log('Product updated successfully', response);
          this.router.navigate(['/admin/product']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    }
  }
}
