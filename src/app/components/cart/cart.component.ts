import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatCardContent } from '@angular/material/card';
//import { Subscription } from 'rxjs'; // Importar Subscription
interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];  // Array que almacenará los productos del carrito
  totalItems: number = 0;
  //private cartSubscription: Subscription | undefined;  // Variable para la suscripción

  constructor(private cartService: CartService) {
    
  }

  ngOnInit(): void {
  this.cartService.cartItemsSubject$.subscribe(items => {
      console.log('📦 Productos recibidos en CartComponent:', items); // 🟢 Depuración
      this.cartItems = items;
      console.log('🛒 Carrito actualizado:', this.cartItems);
    });


   
    this.cartService.totalItems$.subscribe(total => this.totalItems = total);
   
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte cuando el componente se destruya
   // if (this.cartSubscription) {
   //   this.cartSubscription.unsubscribe();
   // }
  }
  

   // Aumentar la cantidad de un producto
   increaseQuantity(item: CartItem) {
    this.cartService.addToCart(item);
    
  }

   // Disminuir la cantidad de un producto
   decreaseQuantity(item: CartItem) {
    this.cartService.decreaseQuantity(item);
  }
   // Método para eliminar un producto del carrito
   removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    //this.cartService.removeFromCart(item);
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item); // Llama al servicio para eliminar el producto
    this.ngOnInit(); // Recarga los datos del carrito
  }

  // Método para calcular el total (opcional)
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
   // return this.cartItems.reduce((total, item) => total + item.price, 0);
  }


}
