import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from '../../mock-products';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateProductDialogComponent } from '../dialog/create-product-dialog/create-product-dialog.component';




@Component({
  standalone: true,
  selector: 'app-homepage',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  imports: [
    CommonModule,
    RouterModule,
    //MatDialogModule,
    //BrowserAnimationsModule,
    //DetailsComponent,
    //MatButtonModule,
  ]

})


export default class DetailsComponent {
  products = PRODUCTS

  title = "Details"

  //constructor(private dialog: matdialog) {}

  // opendialog(): void{
  //   const dialogref = this.dialog.open(createproductdialogcomponent)

  // }

}

