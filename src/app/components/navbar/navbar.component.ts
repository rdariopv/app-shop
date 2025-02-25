import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // ⬅️ Importa esto
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  totalItems: number = 0;
  private cartSubscription: Subscription | undefined;

  constructor(public cartService: CartService, private router: Router) {}

  testClick() {
    console.log("Botón de carrito clickeado");
  }
  
  goToCart() {
    this.router.navigateByUrl('/cart');
  }
  ngOnInit(): void {
   // Suscribirse a los cambios del carrito
   this.cartService.totalItems$.subscribe(total => {
    console.log('🔔 Nuevo valor de totalItems:', total, 'Tipo:', typeof total);
    if (isNaN(total)) {
      console.error('❌ ERROR: totalItems es NaN en Navbar');
    }
    this.totalItems = total || 0;  // Evita NaN asignando 0 por defecto
  });
  
    /*this.cartService.totalItems$.subscribe(total => {
    console.log('🔔 Nuevo valor de totalItems:', total);
    this.totalItems = total;
  });

     this.cartSubscription = this.cartService.getCartItems().subscribe((items) => {
        this.totalItems = items.length;
      });*/
  }

  ngOnDestroy(): void {
    // No olvidar desuscribirse
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}



