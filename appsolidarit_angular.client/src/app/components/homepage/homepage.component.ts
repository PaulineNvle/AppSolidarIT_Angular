import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { THEMES } from '../../mock-theme';
import { MatCardModule } from "@angular/material/card";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ThemeService } from '../../service/web/theme.service';




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
    ThemeService
  ]
})
export default class HomepageComponent implements OnInit{
  private urlBase = "http://localhost:5033"
  private httpClient = inject(HttpClient)
  ngOnInit(): void {
    this.httpClient.get(this.urlBase + "/api/Theme").subscribe((data: any) => {
      this.productCount = urlBase + "/api/Theme".totalItem;
      
      //console.log(data)
      
    })
  }

  themes = THEMES;
  title = 'Page d\'accueil';
  constructor(private route: ActivatedRoute) { }

}
// ajouter un pop up quand on survole la card du theme, pour display un détail des themes 
