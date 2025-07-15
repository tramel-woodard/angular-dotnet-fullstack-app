import { Component, OnInit } from '@angular/core';
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
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', price: 0 };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();  
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  addProduct() {
    this.productService.create(this.newProduct).subscribe(() => {
      this.newProduct = { id: 0, name: '', price: 0 };
      this.loadProducts();
    });
  }

  updatedProduct(p: Product): void {
    this.productService.update(p).subscribe(() => this.loadProducts());
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => this.loadProducts());
  }
}
