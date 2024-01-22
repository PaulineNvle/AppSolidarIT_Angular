import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';


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
    SidenavComponent]
})
export class HeaderComponent {
  opened = false;

}
