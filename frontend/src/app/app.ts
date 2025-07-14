import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'angular-client';

  constructor(private productService: ProductService) {}
  products: any[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    })
  }
}
