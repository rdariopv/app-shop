import { Injectable, Inject ,PLATFORM_ID,} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {  isPlatformBrowser} from '@angular/common'; // Importa esta función

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Lista de productos en el carrito
  private cartItemsSubject = new BehaviorSubject<any[]>(this.getCartFromLocalStorage());
  cartItemsSubject$ = this.cartItemsSubject.asObservable();

  //constructor(){}
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        console.log('Cargando carrito desde localStorage:', JSON.parse(storedCart));
        this.cartItemsSubject.next(JSON.parse(storedCart));
      }
    }
  }
 
  
     // Obtener el carrito desde localStorage si es posible
 // Obtener el carrito desde localStorage si es posible
 private getCartFromLocalStorage(): any[] {
  if (isPlatformBrowser(this.platformId)) { // Verificar si estamos en el navegador
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
}

  private saveCart(items: any[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }
// Guardar el carrito en localStorage
private saveCartToLocalStorage(items: any[]): void {
  if (isPlatformBrowser(this.platformId)) { // Verificar si estamos en el navegador
    localStorage.setItem('cart', JSON.stringify(items));
  }
}
  // Método para añadir un producto al carrito
  addToCart(product: any): void {
 
    
    const updatedItems = [...this.cartItemsSubject.value, product];
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems);
    console.log('✅ Producto agregado:', product);
    console.log('🛒 Carrito actualizado:', updatedItems);
  }

  // Método para obtener los productos en el carrito
  getCartItems() {
    return this.cartItemsSubject.asObservable();  // Devolver observable
     
  }

  // Método para obtener la cantidad total de productos en el carrito
  getTotalItems(): number {
    return this.cartItemsSubject.value.length;
  }
  removeFromCart(product: any): void {
    const index = this.cartItemsSubject.value.indexOf(product);
    if (index > -1) {
      this.cartItemsSubject.value.splice(index, 1);
     // this.cartItemsSubject.next(this.cartItems);  // Emitir el cambio
    }
  }
  

}
