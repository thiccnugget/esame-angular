export type ProductResponse = {
    products:{
      id: number,
      title: string,
      description: string,
      price: number,
      discountPercentage: number,
      rating: number,
      stock: number,
      brand:string,
      category: string,
      thumbnail: string,
      images: string[]
    }[],
    total: number,
    skip: number,
    limit: number
};


export type Cart = {
  id: number,
  qty: number
}


export interface Product  {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand:string,
  category: string,
  thumbnail: string,
  images: string[]
}

export interface ProductDetails extends Product {
  quantity: number;
}
