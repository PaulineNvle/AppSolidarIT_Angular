import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PRODUCTS } from '../../mock-products';
import { DetailsService } from '../../service/web/details.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';





@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    DetailsService
  ]
})




export default class DetailsComponent implements OnInit {

  private urlBase = "http://localhost:5033"
  private httpClient = inject(HttpClient)
  ngOnInit(): void {
    this.httpClient.get(this.urlBase + "/api/Product").subscribe((data: any) => {
      console.log(data)
    })
  }

 
  products = PRODUCTS;
  title = "Details";

  constructor(private route: ActivatedRoute) { }

}
