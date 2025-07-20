import { NgForOf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Product } from '../../models/product';
import { ProductActions } from '../../state/product.actions';
import * as ProductSelectors from '../../state/product.selectors';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgForOf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  private store = inject(Store);

  // signals to track state
  products = signal<Product[]>([]);
  newProduct = signal<Product>({ id: 0, name: '', price: 0 });

  private productsEffect = effect(() => {
    const products = this.store.selectSignal(ProductSelectors.selectAllProducts)();
    this.products.set(products);
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(ProductActions.load());
  }

  addProduct(): void {
    this.store.dispatch(ProductActions.add({ product: this.newProduct() }));
    this.newProduct.set({ id: 0, name: '', price: 0 });
  }

  updateProduct(p: Product): void {
    this.store.dispatch(ProductActions.update({ product: p }));
  }

  deleteProduct(id: number): void {
    this.store.dispatch(ProductActions.delete({ id }));
  }
}
