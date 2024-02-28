import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';
import { FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import ProductsComponent from '../product-list/products.component';
import DetailsComponent from '../details-product/details-product.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../core/navigation/loader/loader.component';
import { IProductUpdate } from '../../products/product-list/IProductsUpdate';
import { productService } from '../service/productService';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  imports: [
    LoaderComponent,
    CommonModule,
    ProductsComponent,
    DetailsComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    productService,
  ]
})
export class EditComponent {
  editProductForm: FormGroup;
  title = "Modifier un produit";
  isLoading: boolean = false;
  product!: IProductUpdate;

 

  constructor(private productService: productService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router)
  {
    this.editProductForm = this.fb.group({
      id: [null],
      label: [''],
      themeId: [null, Validators.required],
      descriptionShort: [''],
      descriptionLong: ['']

    })
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id is: " + id);
    if (!id) {
      console.log("No ID provided");
      return;
    }
    this.productService
      .getProductById(id)
      .subscribe((product) => {
      
      if (!product) {
        console.log("no product");
        return;
      };
      this.product = product,
       //console.log(product.label),
       //console.log(this.product);
       //this.editProductForm.controls["id"].setValue(product.id);
       //this.editProductForm.controls["label"].setValue(product.label);
       //this.editProductForm.controls["themeId"].setValue(product.themeId);
       //this.editProductForm.controls["descriptionShort"].setValue(product.descriptionShort);
       //this.editProductForm.controls["descriptionLong"].setValue(product.descriptionLong);
       this.editProductForm.patchValue(product);
      console.log(this.editProductForm.value);
    });
    console.log(this.product);
  }

  onSubmit() {
    if (this.editProductForm.valid) {
      const updateProduct = {
        id: Number(this.product.id),
        themeId: Number(this.editProductForm.controls["themeId"].value),
        label: this.editProductForm.controls["label"].value,
        descriptionShort: this.editProductForm.controls["descriptionShort"].value,
        descriptionLong: this.editProductForm.controls["descriptionLong"].value
      }

      this.productService
        .editProduct(updateProduct)
        .subscribe({
          next: () => {
            console.log("Produit ajouté avec succès");
            this.editProductForm.reset();
            this.router.navigate(['']); 
          },
          error: (error: HttpErrorResponse) => {
            console.error('Erreur lors de l\'ajout du produit:', error);
            if (error.error.errors) {
              console.log('Erreur de validation', error.error.errors);
            }
          }
        });
    } else {
      console.log('Le formulaire est invalide:', this.editProductForm.errors);
    }
  }

  onDelete() {
    if (!this.product) {
      console.log("Pas de produit selectionné");
      return;
    }
    console.log(this.product.id);
    this.productService
      .deleteProductById(this.product.id)
      .subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Erreur de supression du produit: ', err)
    })
  }
}
