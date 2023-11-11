export interface Product {
  id: string;
  name: string;
  price: string;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}
