import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { THEMES } from '../../mock-theme';
import { MatCardModule } from "@angular/material/card";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../service/web/product.service';



@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [
    UpperCasePipe,
    CommonModule,
    RouterModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    ProductService
  ]
})
export default class HomepageComponent implements OnInit{
  private urlBase = "http://localhost:5033"
  private httpClient = inject(HttpClient)
  ngOnInit(): void {
    this.httpClient.get(this.urlBase + "/api/Product").subscribe((data: any) => {
      console.log(data)
      
    })
  }

  themes = THEMES;
  title = 'Page d\'accueil';


}
// ajouter un pop up quand on survole la card du theme, pour display un détail des themes 
