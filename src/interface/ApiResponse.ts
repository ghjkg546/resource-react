import { CategoryItem } from "./CategoryItem";
import { CommonListItem } from "./CommonListItem";
import { ResourceItem } from "./ResourceItem";

export interface ResApiResponse {
    code: number;
    data: ResourceItem | null;
    msg:string;
  }


  


export interface ResListApiResponse {
  code: number;
  data: CommonListItem<ResourceItem>;
  msg:string;
}

export interface CategoryListApiResponse {
  code: number;
  data: CommonListItem<CategoryItem>;
  msg:string;
}