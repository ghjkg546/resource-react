import { CategoryItem } from "../CategoryItem";
import { CommentEntity, CommonListItem } from "../CommonListItem";
import { ResourceItem } from "../ResourceItem";
import { ResourceItemTotal } from "../ResourceItemTotal";
import { TokenEntity } from "../TokenEntity";

export interface ResApiResponse {
    code: number;
    data: ResourceItemTotal ;
    msg:string;
  }


export interface CommentApiResponse {
  code: number;
  data: CommentEntity[];
  msg:string;
}

 
export interface LoginApiResponse {
  code: number;
  data: TokenEntity;
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