import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Lista de productos en el carrito
  private cartItems: any[] = [];

  constructor() { }

  // Método para añadir un producto al carrito
  addToCart(product: any): void {
    this.cartItems.push(product);
    console.log(this.cartItems); // Muestra el carrito actualizado en la consola
  }

  // Método para obtener los productos en el carrito
  getCartItems(): any[] {
    return this.cartItems;
  }

  // Método para obtener la cantidad total de productos en el carrito
  getTotalItems(): number {
    return this.cartItems.length;
  }
  removeFromCart(product: any): void {
    const index = this.cartItems.indexOf(product);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

}
