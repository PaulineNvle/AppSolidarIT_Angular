import { CommonModule } from '@angular/common';

import { Component, } from '@angular/core';
import { HeaderComponent } from './components/navigation/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import HomepageComponent from './components/homepage/homepage.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductService } from './service/web/theme.service';



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

  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'Portfolio SolidarIT';

}
