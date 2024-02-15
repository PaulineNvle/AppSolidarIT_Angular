import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { productService} from '../service/productService';
import { mockThemes } from './mock-theme';




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
    productService
  ]
})
export default class HomepageComponent implements OnInit{

constructor(private route: ActivatedRoute) { }

  private urlBase = "http://localhost:5033"
  private httpClient = inject(HttpClient)
  ngOnInit(): void {
    this.httpClient.get(this.urlBase + "/api/Theme").subscribe((data: any) => {

      console.log(data)
      
    })
  }


  themes = mockThemes;
  title = 'Page d\'accueil';
  

}
