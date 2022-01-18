import { Component, OnInit } from '@angular/core';

export type Category = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export type Store = {
  id: number;
  name: string;
  image: string;
  deliveryTime: string;
};

export const categories: Category[] = [
  {
    id: 1,
    image:
      'https://images.rappi.com/new_store_type/restaurant_1616046277251.png?e=webp&d=1920x1',
    name: 'Restaurantes',
    description:
      'Los mejores restaurantes de la ciudad. ¡Disfruta de los mejores platos!',
  },
  {
    id: 2,
    name: 'Mercados',
    image:
      'https://images.rappi.com/home-ab-objects/marekt-1614920725.png?e=webp&d=1920x1',
    description:
      'Los mejores mercados de la ciudad. ¡Disfruta de los mejores productos!',
  },
  {
    id: 3,
    name: 'Farmacia',
    image:
      'https://images.rappi.com/home-ab-objects/farma-1614920789.png?e=webp&d=1920x1',
    description:
      'Los mejores farmacias de la ciudad. ¡Disfruta de los mejores productos!',
  },
  {
    id: 4,
    name: 'Licores',
    image:
      'https://images.rappi.com/home-ab-objects/licores-glow-1613515492.png?e=webp&d=1920x1',
    description:
      'Los mejores licores de la ciudad. ¡Disfruta de los mejores productos!',
  },
  {
    id: 5,
    name: 'Express',
    image:
      'https://images.rappi.com/home-ab-objects/licores-glow-1613515492.png?e=webp&d=1920x1',
    description:
      'Los mejores licores de la ciudad. ¡Disfruta de los mejores productos!',
  },
  {
    id: 6,
    name: 'Rappi Travel',
    image:
      'https://images.rappi.com/home-ab-objects/rappi-travel-1616004487.png?e=webp&d=1920x1',
    description:
      'Los mejores licores de la ciudad. ¡Disfruta de los mejores productos!',
  },
  {
    id: 7,
    name: 'Tiendas',
    image:
      'https://images.rappi.com/home-ab-objects/ecommerce-glow-1613515344.png?e=webp&d=1920x1',
    description:
      'Los mejores licores de la ciudad. ¡Disfruta de los mejores productos!',
  },
  {
    id: 8,
    name: 'Mascotas',
    image:
      'https://images.rappi.com/new_store_type/Pets_1619447376788.png?e=webp&d=1920x1',
    description:
      'Los mejores licores de la ciudad. ¡Disfruta de los mejores productos!',
  },
];

export const stores: Store[] = [
  {
    id: 1,
    name: 'KFC - Pollo',
    image:
      'https://images.rappi.com/restaurants_background/homekfcrappi-1601991329947.png?e=webp&d=1920x1',
    deliveryTime: '30 min',
  },
  {
    id: 2,
    name: 'Juan Valdez',
    image:
      'https://images.rappi.com/restaurants_background/portadarapp-1600807760068.jpg?e=webp&d=1920x1',
    deliveryTime: '30 min',
  },
  {
    id: 3,
    name: 'Papa Johns',
    image:
      'https://images.rappi.com/restaurants_background/1-1604501901181.png?e=webp&d=1920x1',
    deliveryTime: '30 min',
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public categories = categories;

  public stores = stores;

  constructor() {}

  ngOnInit(): void {}
}
