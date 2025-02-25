import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  totalItems: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private router: Router) {}

  testClick() {
    console.log("Botón de carrito clickeado");
  }
  
  goToCart() {
    this.router.navigateByUrl('/cart');
  }
  ngOnInit(): void {
   // Suscribirse a los cambios del carrito
   this.cartSubscription = this.cartService.getCartItems().subscribe((items) => {
    this.totalItems = items.length;
  });
  }

  ngOnDestroy(): void {
    // No olvidar desuscribirse
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}



