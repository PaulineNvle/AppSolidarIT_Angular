import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from '../../mock-products';





@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  imports: [DetailsComponent,
    CommonModule,
    RouterModule
  ]
})
export default class DetailsComponent {
  products = PRODUCTS

 


}
