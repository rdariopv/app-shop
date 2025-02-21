import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common'; // 👈 Importar NgFor
import { CartService } from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [

    { id: 1, name: 'Angular Framework', price: 800, image: 'https://angular.io/assets/images/logos/angular/angular.png' },
    { id: 2, name: 'Vue Framework', price: 500, image: 'https://vuejs.org/images/logo.png' },
    { id: 3, name: 'React Framework', price: 600, image: 'https://reactjs.org/logo-og.png'  },
    { id: 4, name: 'Angular Framework', price: 800, image: 'https://angular.io/assets/images/logos/angular/angular.png' },
    { id: 5, name: 'Vue Framework', price: 500, image: 'https://vuejs.org/images/logo.png' },
    { id: 6, name: 'React Framework', price: 600, image: 'https://reactjs.org/logo-og.png'  }
  ];

    // Inyectar el servicio del carrito
    constructor(private cartService: CartService) {}

    // Método para añadir un producto al carrito
  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

}
