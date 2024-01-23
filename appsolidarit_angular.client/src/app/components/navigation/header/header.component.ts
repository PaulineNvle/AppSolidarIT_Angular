import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';


/**
 * @title Toolbar overview
 */
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatSidenavModule,
    FormsModule]
})
export class HeaderComponent {
  opened = false;

}
