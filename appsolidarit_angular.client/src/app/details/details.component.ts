import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { PRODUCTS } from '../mock-products';
import { Router, RouterModule } from '@angular/router';




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
