import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    RouterLinkActive,
    RouterLink
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Portfolio SolidarIT';
}
