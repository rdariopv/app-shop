import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatCardContent } from '@angular/material/card';
//import { Subscription } from 'rxjs'; // Importar Subscription

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];  // Array que almacenará los productos del carrito
  //private cartSubscription: Subscription | undefined;  // Variable para la suscripción

  constructor(private cartService: CartService) {
    
  }

  ngOnInit(): void {
  this.cartService.cartItemsSubject$.subscribe(items => {
      console.log('📦 Productos recibidos en CartComponent:', items); // 🟢 Depuración
      this.cartItems = items;
    });
   
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte cuando el componente se destruya
   // if (this.cartSubscription) {
   //   this.cartSubscription.unsubscribe();
   // }
  }
  
   // Método para eliminar un producto del carrito
   removeItem(item: any): void {
    this.cartService.removeFromCart(item);
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item); // Llama al servicio para eliminar el producto
    this.ngOnInit(); // Recarga los datos del carrito
  }

  // Método para calcular el total (opcional)
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }


}
