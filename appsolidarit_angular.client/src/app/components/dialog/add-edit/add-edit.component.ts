import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import ProductsComponent from '../../products/products.component';
import DetailsComponent from '../../details/details.component';
import { ProductService } from '../../../service/web/product.service';
import { DetailsService } from '../../../service/web/details.service';
import { first } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css',
  imports: [
    ProductsComponent,
    DetailsComponent,
    FormBuilder,
    FormGroup,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    DetailsService,
    ProductService
  ]
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  private urlBase = "http://localhost:5033"
  private httpClient = inject(HttpClient)

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      // password only required in add mode
      //password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]]
    });

    this.title = 'Ajouter un produit';
    if (this.id) {
      // edit mode
      this.title = 'Editer un produit';
      this.loading = true;
      this.httpClient.get(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveUser()
      .pipe(first())
      .subscribe({
        next: () => {
          this.route.succesMessage('Produit enregistré', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/products');
        },
        error: (error: any) => {
          
          this.submitting = false;
        }
      })
  }

  private saveUser() {
    // create or update user based on id param
    return this.id
      ? this.accountService.update(this.id!, this.form.value)
      : this.accountService.register(this.form.value);
  }
}
