import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import ProductsComponent from '../../products/products.component';
import DetailsComponent from '../../details/details.component';
import { Service } from '../../../service/web/service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Theme } from '../../../interface-theme';
import { LoaderComponent } from '../../navigation/loader/loader.component';



@Component({
  standalone: true,
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
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
export class AddComponent {
  title = "Ajouter un produit";

  constructor(private route: ActivatedRoute) { }

  themes: Theme[] = [
    { id: 1, name: 'Business Management', descriptionShort: 'Recettes & dépenses AC' },
    { id: 2, name: 'Contact Management', descriptionShort: 'Gestion de dossiers et traçabilité' },
    { id: 3, name: 'SolidarIT as a Services', descriptionShort: 'Proactivité calls to action' },
    { id: 4, name: 'My Solidaris', descriptionShort: 'Guichet Solidaris mobile' },
    { id: 5, name: 'Case Management', descriptionShort: 'Gestion de dossiers' }
  ];


  theme!: string
  label!: string
  descriptionShort!: string
  descriptionLong!: string
  isLoading: boolean = false;

  Service: any;
  createSuccess!: boolean;

  onCreateProduct(formsControler: any) {

    if (!formsControler.valid)
      this.createSuccess = false
    if (formsControler.valid) {
      this.themes.forEach(t => {
        if (t.id == formsControler.value.id)
          formsControler.value.name = t.name
      })

      this.Service.createProduct(formsControler.value).subscribe(
        (data: any) => {
          this.createSuccess = true
        },
        Error, (err: any) => {
          this.isLoading = false;
          console.log(err, 'erreur')

      }

      )
    }
  }
}
