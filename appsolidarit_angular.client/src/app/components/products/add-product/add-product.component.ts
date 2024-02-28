import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute, 
  RouterModule,
  Router
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { productService } from '../service/productService';
import ProductsComponent from '../product-list/products.component';
import { IProductCreate } from '../product-list/IProductsCreate';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  standalone: true,
  selector: 'app-add',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  imports: [
    CommonModule,
    ProductsComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    productService
  ]
})
export class AddComponent {
  productForm: FormGroup;
  title = "Ajouter un produit";
  isLoading: boolean = false;
  product!: IProductCreate ;

  constructor(
    private productService: productService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router)
  {
    this.productForm = this.fb.group({
      label: [''],
      themeId: [null, Validators.required],
      descriptionShort: [''],
      descriptionLong: ['']
    });
  }


  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = {
        label : this.productForm.controls["label"].value,
        themeId: Number(this.productForm.controls["themeId"].value),
        descriptionShort: this.productForm.controls["descriptionShort"].value,
        descriptionLong: this.productForm.controls["descriptionLong"].value
      }
      
      this.productService
        .addProduct(newProduct)
        .subscribe({
        next: () => {
          console.log("Produit ajouté avec succès");
          this.productForm.reset();
            this.router.navigate(['/product']);
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
