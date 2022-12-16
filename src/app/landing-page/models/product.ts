export interface ProductResponse {
  id: string;
  name: string;
  price: number;
  description: string;
  total: number;
  img: string;
}
export interface GroupCategoryResponse {
  id: string;
  name: string;
  categories: Category[]
}
export interface Category {
  id: string;
  name: string;
}
export interface GetCategoryResponse {
  id: string;
  name: string;
  products: ProductResponse[];
}
export class GetProductResponse {
  id!: string;
  name!: string;
  price!: number;
  description!: string;
  total!: number;
  img!: string;
  listSizes!: size[];
}
export interface size {
  id: string;
  name: string;
}
export interface ListProductRequest {
  search: string;
  pageIndex: number;
  pageSize: number;
}
export interface ListProductResponse {
  products: ProductResponse[];
  totalPage: number;
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
}
