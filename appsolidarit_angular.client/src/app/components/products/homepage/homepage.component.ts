import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { productService} from '../service/productService';
import { ThemeService } from '../service/theme-service.service';
import { ITheme } from './ITheme';




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

  
  title = 'Page d\'accueil'; 
  
  theme: ITheme[] = [];
  constructor(
  private route: ActivatedRoute,
  private themeService: ThemeService
  ) { }


  ngOnInit(): void {
    this.themeService.getTheme().subscribe(theme =>  {
      this.theme = theme;
      console.log(theme)
    })
  }
}
