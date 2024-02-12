import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import ProductsComponent from '../../products/products.component';
import DetailsComponent from '../../details/details.component';
import { Service } from '../../../service/web/service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Theme } from '../../../interface-theme';



@Component({
  standalone: true,
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  imports: [
    CommonModule,
    ProductsComponent,
    DetailsComponent,
    FormGroup,
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

  saveAddProduct() { // ou saveaddproduct onsubmit ?
    var inputData = {
      theme: this.theme,
      label: this.label,
      descriptionShort: this.descriptionShort,
      descriptionLong: this.descriptionLong
    }


    this.Service.saveAddProduct(inputData).subscribe({
      next: (res: any) => {
        console.log(res, 'reponse')
      },
      Error: (err: any) => {
        console.log(err, 'erreur')
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

