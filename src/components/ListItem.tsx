import { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/fetchUtils';
import { Link } from 'react-router-dom';
import { ResourceItem } from '../interface/ResourceItem';
import { ResListApiResponse } from '../interface/request/ApiResponse';


interface ListItemProps {
  categoryId: number|string;
}

const ListItem:React.FC<ListItemProps> = ({ categoryId })  => {
  // const categoryId =1
  // const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ResourceItem[] >([]);
  
  useEffect(() => {
    fetchFromApi<ResListApiResponse>('/api/res/list?category_id='+categoryId)
      .then(responseData => setData(responseData.data.list?responseData.data.list:[]))
      .catch(err => {
        console.log(err)
      });
  }, [categoryId]);
  const listItems = data.map((item: ResourceItem) =>

    <div className="bg-white rounded-xl shadow-md " key={item.id}>
      <div className="bg-white rounded-xl shadow-md ">
      <Link  to={handleUrl(item)}>
        <img
          className="w-full h-48 object-cover"
          src={item.cover_img}
          alt={item.name}
        />
        </Link>
      </div>

      <div className="p-8">
        <Link  to={handleUrl(item)}>
          <a href="#"
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {item.name}
            </div>
          </a>
        </Link>
      </div>
    </div>

  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {listItems}
    </div>
  );
};
function handleUrl(item: ResourceItem) {
  return "/detail/" + item.id;
}

export default ListItem;
