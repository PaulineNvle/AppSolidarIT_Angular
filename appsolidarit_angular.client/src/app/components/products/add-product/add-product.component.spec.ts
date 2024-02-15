import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add-product.component';



describe('UpdateProductDialogComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
