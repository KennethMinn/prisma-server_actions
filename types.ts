export interface Product {
  id: string;
  title: string;
  price: string;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}
