import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PRODUCTS } from '../../mock-products';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../service/web/service';





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
    Service
  ]
})


export default class DetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  products = PRODUCTS;
  title = "Details";

  private urlBase = "http://localhost:5033"
  private httpClient = inject(HttpClient)

  ngOnInit(): void {
    this.httpClient.get(this.urlBase + "/api/Product").subscribe((data: any) => {
      console.log(data)
    })
  }


}
