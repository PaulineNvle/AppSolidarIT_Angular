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
 Service: any;
  constructor(private route: ActivatedRoute) { }

 

  theme!: string
  label!: string
  descriptionShort!: string
  descriptionLong!: string

  isLoading: boolean = false;
  loadingTitle: string = 'Loading';
  errors: any = [];

  saveProduct() { // ou saveaddproduct onsubmit ?

    this.isLoading = true;
    this.loadingTitle = 'Saving';
    var inputData = {
      theme: this.theme,
      label: this.label,
      descriptionShort: this.descriptionShort,
      descriptionLong: this.descriptionLong
    }


    this.Service.saveProduct(inputData).subscribe({
      next: (res: any) => {
        console.log(res, 'reponse');

       
        alert(res.message); // permet de clear les data après le save
        this.theme = '';
        this.label = '';
        this.descriptionShort = '';
        this.descriptionLong = '';
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.isLoading = false;
        console.log(err.error.errors, 'erreur')
      }
    });

    // subscribe aussi pour post/update/del

  }


  themes: Theme[] = [
    { name: 'Business Management', descriptionShort: 'Recettes & dépenses AC'},
    { name: 'Contact Management', descriptionShort: 'Gestion de dossiers et traçabilité'},
    { name: 'SolidarIT as a Services', descriptionShort: 'Proactivité calls to action'},
    { name: 'My Solidaris', descriptionShort: 'Guichet Solidaris mobile'},
    { name: 'Case Management', descriptionShort: 'Gestion de dossiers'}
  ];



}

