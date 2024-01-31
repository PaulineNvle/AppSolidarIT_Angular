import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { THEMES } from '../../mock-theme';
import { MatCardModule } from "@angular/material/card";






@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [HomepageComponent,
    UpperCasePipe,
    CommonModule,
    RouterModule,
    MatCardModule
  ]
})
export default class HomepageComponent {
  themes = THEMES;
  title = 'Page d\'accueil';
}
// ajouter un pop up quand on survole la card du theme, pour display un détail des themes 
