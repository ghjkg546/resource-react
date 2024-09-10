import { UserEntity } from "./UserEntity";

export interface CommonListItem <T>{
    list:T[];
    total:number;
  }


 export  interface CommentEntity {
    id: number;
    content: string;
    user:UserEntity;
}