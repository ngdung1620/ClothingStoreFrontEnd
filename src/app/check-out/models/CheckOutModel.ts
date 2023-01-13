
export interface ItemInCart {
  id: string;
  quantity: string;
  productId: string;
  price: number
  name: string;
  img: string;
  size: number
}
export interface OrderHaveAccountRequest {
  cartId: string;
  totalPrice: number;
  customerName: string;
  shippingFee: number;
  phoneNumber: string;
  address: string;
  userId: string;
}
export interface OrderDontHaveAccountRequest {
  itemOrders: ItemOrders[];
  totalPrice: number;
  shippingFee: number;
  CustomerName: string;
  phoneNumber: string;
  address: string;
}
export interface ItemOrders {
  productId: string;
  quantity: string;
  size: string;
}
export interface OrderResponse {
  status: number;
  message: string;
  productError: string[];
  orderId: string;
}
export interface GetOrderResponse {
  orderId: string;
  orderDate: Date;
  status: number;
  totalPrice: number;
  shippingFee: number;
  customerName: string;
  phoneNumber: string;
  address: string;
  productOrders: ProductOrderModel[];
}

export interface ProductOrderModel {
  productId: string;
  productName: string;
  quantity: number;
  size: string;
  price: number;
  img: string;

}
