import { TestBed } from '@angular/core/testing';
import { productService } from './productService';



describe('ProductService', () => {
  let service: productService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(productService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
