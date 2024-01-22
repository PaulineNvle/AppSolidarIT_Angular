import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  imports: [MatSidenavModule]
})
export class SidenavComponent {

}
