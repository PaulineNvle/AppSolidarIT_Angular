import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import ProductsComponent from '../product-list/products.component';
import DetailsComponent from '../details-product/details-product.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../core/navigation/loader/loader.component';
import { IProduct } from '../../products/product-list/IProducts';
import { productService } from '../service/productService';
import { ITheme } from '../homepage/ITheme';



@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  imports: [
    LoaderComponent,
    CommonModule,
    ProductsComponent,
    DetailsComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    productService,
  ]
})
export class EditComponent {
  title = "Modifier un produit";
  Service: any;


  constructor(private route: ActivatedRoute) { }

  theme!: string;
  label!: string;
  descriptionShort!: string;
  descriptionLong!: string;
  isLoading: boolean = false;
  loadingTitle: string = 'Loading';
  id: any;
  updateSuccess!: boolean; // boolean pour le fi 
  product!: IProduct;

  themes: ITheme[] = [
    { id: 1, name: 'Business Management', descriptionShort: 'Recettes & dépenses AC' },
    { id: 2, name: 'Contact Management', descriptionShort: 'Gestion de dossiers et traçabilité' },
    { id: 3, name: 'SolidarIT as a Services', descriptionShort: 'Proactivité calls to action' },
    { id: 4, name: 'My Solidaris', descriptionShort: 'Guichet Solidaris mobile' },
    { id: 5, name: 'Case Management', descriptionShort: 'Gestion de dossiers' }
  ];



  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.get();
  }

  get() {
    this.Service.getProduct(this.id).subscribe(
      (data: IProduct) => {
        this.product = data;
      }
    );
  }

  onUpdateProduct(product: any) {
    if (!product.valid)
      this.updateSuccess = false; // verifie si le product est valide, si pas, c'est false a update success
    if (product.valid) { // si il est valide,
      this.themes.forEach(t => {
        if (t.id == product.value.themeId) //Si un thème correspondant est trouvé, 
          product.value.name = t.name; // elle met à jour le nom du thème dans l'objet produit avec product.value.name = t.name.
        console.log(product.value.name);
      });
      this.Service.updateProduct(product.value).subscribe(
        (data: any) => {
          this.updateSuccess = true; // si màj réussie: update success a true
        },
        (error: any) => {
          this.isLoading = false;
          console.log(error);
        }

      );
    }
  }
}
