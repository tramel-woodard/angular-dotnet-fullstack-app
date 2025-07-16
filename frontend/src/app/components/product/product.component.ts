import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgForOf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);

  // signals to track state
  products = signal<Product[]>([]);
  newProduct = signal<Product>({ id: 0, name: '', price: 0 });

  ngOnInit(): void {
    this.loadProducts();  
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => this.products.set(data));
  }

  addProduct(): void {
    this.productService.create(this.newProduct()).subscribe(() => {
      this.newProduct.set({ id: 0, name: '', price: 0 });
      this.loadProducts();
    });
  }

  updateProduct(p: Product): void {
    this.productService.update(p).subscribe(() => this.loadProducts());
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => this.loadProducts());
  }
}
