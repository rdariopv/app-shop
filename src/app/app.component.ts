import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,NavbarComponent,ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cartItemCount: number = 0;
  title = 'app-shop';
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItemCount = this.cartService.getTotalItems();
  }
}
