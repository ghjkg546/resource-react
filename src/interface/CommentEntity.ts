import { UserEntity } from "./UserEntity";

export interface CommonListItem <T>{
    list:T[];
  }


 export  interface CommentEntity {
    id: number;
    content: string;
    user:UserEntity;
}