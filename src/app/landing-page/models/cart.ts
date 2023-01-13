export interface CartLocal {
  id: string;
  idProduct: string;
  size: string;
  quantity: number;
  price: number;
  name: string;
  img: string;
}
export interface AddProductInCartRequest {
  cartId: string;
  productId: string;
  quantity: number;
  size: number;
}
export interface AddProductInCartResponse {
  status: number;
  message: string;
}
