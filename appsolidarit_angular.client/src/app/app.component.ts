import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import {  Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/navigation/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';



@Component({
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    RouterLinkActive,
    RouterLink,
    MatSidenavModule,
    FormsModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Portfolio SolidarIT';


}
