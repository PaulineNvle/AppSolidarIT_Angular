import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import ProductsComponent from '../product-list/products.component';
import DetailsComponent from '../details-product/details-product.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../core/navigation/loader/loader.component';
import { IProduct } from '../../products/product-list/IProducts';
import { productService } from '../service/productService';

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
  product: IProduct | undefined;

 

  constructor(private productService: productService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router)
  {
    this.editProductForm = this.fb.nonNullable.group({
      id: [''],
      label: [''],
      descriptionShort: [''],
      descriptionLong: ['']

    })
  }


  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'));
    console.log("id is: " + id);
    if (!id) {
      console.log("No ID provided");
      return;
    }
    this.productService.getProductByid(id).subscribe((product) => {
      console.log(product)
      if (!product) {
        console.log("no product");
        return;
      };
      this.product = product,
        console.log(product.label),
        console.log(this.product);
      this.editProductForm.patchValue(product);
      console.log(this.editProductForm.value);
    });
    console.log(this.product);
  }

 
  onSave() {
    if (this.editProductForm.valid)
      this.productService.editProduct(this.editProductForm.value).subscribe({
        next: () => this.router.navigate(['/products']),
      });

  }

  onDelete() {
    if (!this.product) {
      console.log("Pas de produit selectionné");
      return;
    }
    console.log(this.product.id);
    this.productService.deleteProductById(this.product.id)
      .subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Erreur de supression du produit: ', err)
    })
  }
}
