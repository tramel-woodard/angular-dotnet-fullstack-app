import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'angular-client';

  constructor(private productService: ProductService) {}
  products: any[] = [];

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;
    })
  }
}
