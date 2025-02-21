import { Component, OnInit,  } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems(); // Ahora se inicializa correctamente en ngOnInit
    this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
  

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item); // Llama al servicio para eliminar el producto
    this.ngOnInit(); // Recarga los datos del carrito
  }
}
