import { Injectable, Inject ,PLATFORM_ID,} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {  isPlatformBrowser} from '@angular/common'; // Importa esta función


interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number; 
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Lista de productos en el carrito
  private cart: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromLocalStorage());
  private totalItemsSubject = new BehaviorSubject<number>(0);

  cartItemsSubject$ = this.cartItemsSubject.asObservable();
  totalItems$ = this.totalItemsSubject.asObservable();

  //constructor(){}
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.loadCartFromStorage();
  }
 

  // 🔹 Cargar carrito desde localStorage
  private loadCartFromStorage() {
    if (isPlatformBrowser(this.platformId)) {

      const storedCart = localStorage.getItem('cart');
     
      if (storedCart) {
        console.log('Cargando carrito desde localStorage:', JSON.parse(storedCart));
        this.cart = storedCart ? JSON.parse(storedCart) : [];
      } else {
        if (!Array.isArray(this.cart)) {
          console.error('❌ ERROR: Datos corruptos en localStorage. Reiniciando carrito.');
          this.cart = [];
        }
        
      }

   
      this.cartItemsSubject.next([...this.cart]);
      this.updateTotalItems();
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
private saveCartToLocalStorage(): void {
  if (isPlatformBrowser(this.platformId)) { // Verificar si estamos en el navegador
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartItemsSubject.next([...this.cart])
    this.updateTotalItems();
  }
}
  // Método para añadir un producto al carrito
  addToCart(product: CartItem): void {
 
    const existingItem = this.cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCartToLocalStorage();
    this.updateTotalItems();
    console.log('✅ Producto agregado:', product);
    console.log('🛒 Carrito actualizado:', this.cart);
  }

  // 🔹 Disminuir cantidad
  decreaseQuantity(product: CartItem) {
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.cart.splice(index, 1);
      }
      this.saveCartToLocalStorage();
      this.updateTotalItems();
    }
  }
  // Método para obtener los productos en el carrito
  getCartItems() {
    return this.cartItemsSubject.asObservable();  // Devolver observable
     
  }

  // Método para obtener la cantidad total de productos en el carrito
  getTotalItems(): number {
    return this.cart.length;
  }

  removeFromCart(product: CartItem): void {
    console.log('🛒 Eliminando producto con ID:', product.id);
    const index = this.cart.indexOf(product);
    if (index > -1) {
      this.cart = this.cart.filter(item => item.id !== product.id);
      //this.cart.splice(index, 1);
      this.saveCartToLocalStorage();
      this.updateTotalItems();
     // this.cartItemsSubject.next(this.cartItems);  // Emitir el cambio
    }
  }
  
  private updateTotalItems() {
    //const total = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = this.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    console.log('🔄 Actualizando totalItems:', total);
    if (isNaN(total)) {
      console.error('❌ ERROR: totalItems es NaN');
    }
    this.totalItemsSubject.next(total); // ⬅️ Emitimos el nuevo valor
  }

  // 🔹 Vaciar el carrito completamente
  clearCart() {
    this.cart=[];
    localStorage.removeItem('cart');
    this.saveCartToLocalStorage();
    this.updateTotalItems();
  }

}