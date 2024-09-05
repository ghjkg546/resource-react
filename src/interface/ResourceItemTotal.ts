import { CommentEntity } from "./CommonListItem";
import { ResourceItem } from "./ResourceItem";


export interface ResourceItemTotal {
    info:ResourceItem,
    comments:CommentEntity[]
  }