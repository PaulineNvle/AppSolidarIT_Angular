import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Component, } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './core/navigation/header/header.component';
import HomepageComponent from './components/products/homepage/homepage.component';





@Component({
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    HomepageComponent,
    RouterLinkActive,
    RouterLink,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'Portfolio SolidarIT';

}
