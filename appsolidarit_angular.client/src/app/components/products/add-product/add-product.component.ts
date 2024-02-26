import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import DetailsComponent from '../details-product/details-product.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../core/navigation/loader/loader.component';
import { productService } from '../service/productService';
import ProductsComponent from '../product-list/products.component';
import { IProduct } from '../product-list/IProducts';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-add',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  imports: [
    LoaderComponent,
    CommonModule,
    ProductsComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DetailsComponent
  ],
  providers: [
    productService
  ]
})
export class AddComponent {
  productForm: FormGroup;
  title = "Ajouter un produit";
  isLoading: boolean = false;

  constructor(
    private productService: productService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router)
  {
    this.productForm = this.fb.group({
      id: [],
      label: ['', Validators.required],
      descriptionShort: [''],
      descriptionLong: ['']
    });
  }

  //onSubmit() {
  //  const newProduct: IProduct = this.productForm.value;
  //  console.log("New Product", newProduct)
  //  if (this.productForm.valid) {
  //    this.productService.addProduct(newProduct).subscribe({
  //      next: () => this.router.navigate(['/products']),
  //      error: (error: HttpErrorResponse) => {
  //        console.log(error);
  //        if (error.error.errors) {
  //          console.log('Erreur de validation', error.error.errors);
  //        }
  //      }

  //    });

  //    } else if (this.productForm.invalid) {
  //      console.log('Le formulaire est invalide:', this.productForm.errors, 'newProduct', newProduct);
  //  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: IProduct = this.productForm.value;
      this.productService
        .addProduct(newProduct)
        .subscribe({
        next: () => {
          console.log("Produit ajouté avec succès");
          this.productForm.reset();
          this.router.navigate(['/products']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout du produit:', error);
          if (error.error.errors) {
            console.log('Erreur de validation', error.error.errors);
          }
        }
      });
    } else {
      console.log('Le formulaire est invalide:', this.productForm.errors);
    }

  }

}
