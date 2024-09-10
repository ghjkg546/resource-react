import { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/fetchUtils';
import { Link } from 'react-router-dom';
import { ResourceItem } from '../interface/ResourceItem';
import { ResListApiResponse } from '../interface/request/ApiResponse';
import { Pagination } from 'antd';

interface ListItemProps {
  categoryId: number|string;
  keyword:string;
}

const ListItem:React.FC<ListItemProps> = ({ categoryId ,keyword })  => {
  const [data, setData] = useState<ResourceItem[] >([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  

 
  const onChange = async (page:number) => {
    setPage(page)
    getList(page)
  };

 

  const getList =(pageNum:number)=>{
    fetchFromApi<ResListApiResponse>('/api/res/list?category_id='+categoryId+'&pageNum='+pageNum+'&keyword='+keyword)
    .then(responseData => {
      setData(responseData.data.list?responseData.data.list:[])
      setTotal(responseData.data.total)
    })
    .catch(err => {
      console.log(err)
    });
  }

  
  useEffect(() => {
   getList(1)
  }, [categoryId,keyword]);
  const listItems = data.map((item: ResourceItem) =>
<Link  to={handleUrl(item)}>
<article className="flex flex-col dark:bg-gray-50">
				<a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
					<img alt="" className="object-cover w-full h-52 dark:bg-gray-500" 
          src={item.cover_img?item.cover_img:'noimage.png'} />
				</a>
				<div className="flex flex-col flex-1 p-6">
					<a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
					{/* <a rel="noopener noreferrer" href="#" className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600">Convenire</a> */}
					<h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{item.name}</h3>
					<div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
						<span>{item.create_time_str}</span>
						<span>{item.views} 阅读</span>
					</div>
				</div>
			</article></Link>

  );
  return (
    <>
    <section className="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
	<div className="container p-6 mx-auto space-y-8">
		<div className="space-y-2 text-center">
			<h2 className="text-3xl font-bold">疾风资源站</h2>
			<p className="font-serif text-sm dark:text-gray-600">欢迎来到我的资源站,这里可以分享电子游戏、桌游等资源</p>
		</div>
		<div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
    {listItems}
			
		</div>
    <Pagination defaultCurrent={1} current={page} total={total} onChange={onChange} />
	</div>
</section>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
     
    </div>
    </>
   
  );
};
function handleUrl(item: ResourceItem) {
  return "/detail/" + item.id;
}



export default ListItem;
