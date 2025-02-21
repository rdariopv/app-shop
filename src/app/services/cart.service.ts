import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Lista de productos en el carrito
  private cartItems: any[] = [];
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject(this.cartItems);


  constructor() { }

  // Método para añadir un producto al carrito
  addToCart(product: any): void {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);  // Emitir el cambio
    console.log(this.cartItems); // Muestra el carrito actualizado en la consola
  }

  // Método para obtener los productos en el carrito
  getCartItems() {
    return this.cartItemsSubject.asObservable();  // Devolver observable
     
  }

  // Método para obtener la cantidad total de productos en el carrito
  getTotalItems(): number {
    return this.cartItems.length;
  }
  removeFromCart(product: any): void {
    const index = this.cartItems.indexOf(product);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next(this.cartItems);  // Emitir el cambio
    }
  }

}
