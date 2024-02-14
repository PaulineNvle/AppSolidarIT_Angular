import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Theme } from '../../../interface-theme';
import { Service } from '../../../service/web/service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import DetailsComponent from '../../details/details.component';
import ProductsComponent from '../../products/products.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../navigation/loader/loader.component';
import { Product } from '../../../interface-products';

@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  imports: [
    LoaderComponent,
    CommonModule,
    ProductsComponent,
    DetailsComponent,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    Service,
  ]
})
export class EditComponent {
  title = "Modifier un produit";
  Service: any;


  constructor(private route: ActivatedRoute) { }

  theme!: string
  label!: string
  descriptionShort!: string
  descriptionLong!: string

  themes: Theme[] = [
    { id: 1, name: 'Business Management', descriptionShort: 'Recettes & dépenses AC' },
    { id: 2, name: 'Contact Management', descriptionShort: 'Gestion de dossiers et traçabilité' },
    { id: 3, name: 'SolidarIT as a Services', descriptionShort: 'Proactivité calls to action' },
    { id: 4, name: 'My Solidaris', descriptionShort: 'Guichet Solidaris mobile' },
    { id: 5, name: 'Case Management', descriptionShort: 'Gestion de dossiers' }
  ];

  isLoading: boolean = false;
  loadingTitle: string = 'Loading';
  id: any;
  updateSuccess!: boolean;
  product!: Product


  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.get()
  }

  get() {
    this.Service.getProduct(this.id).subscribe(
      (data: Product) => {
        this.product = data
      }
    )
  }

  onUpdateProduct(product: any) {


    if (!product.valid)
      this.updateSuccess = false
    if (product.valid) {
      this.themes.forEach(t => {
        if (t.id == product.value.themeId)
          product.value.name = t.name
        console.log(product.value.name)
      })
      this.Service.updateProduct(product.value).subscribe(
        (data: any) => {
          this.updateSuccess = true
        },
        Error, (err: any) => {
          this.isLoading = false;
          console.log(err, 'erreur')
        }

      )
    }
  }
}

