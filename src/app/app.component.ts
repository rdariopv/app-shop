import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent,ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cartItemCount: number = 0;
  title = 'app-shop';
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItemCount = this.cartService.getTotalItems();
  }
}
