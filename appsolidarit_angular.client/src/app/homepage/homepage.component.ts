import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { THEMES } from '../mock-theme';




@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [HomepageComponent,
    UpperCasePipe,
    CommonModule,
    RouterModule
  ]
})
export default class HomepageComponent {
  themes = THEMES
  title = 'Page d\'accueil';
}
