import { NetDiskItem } from "./NetDiskItem";

export interface ResourceItem {
    name: string;
    id: number;
    description:string;
    cover_img:string;
    disk_items_array:Array<NetDiskItem>
  }