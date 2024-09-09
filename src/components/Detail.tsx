import  { useEffect, useState } from 'react';
import { fetchFromApi, postData } from '../utils/fetchUtils';
import { ResourceItem } from '../interface/ResourceItem';
import { Link,  useNavigate, useParams } from 'react-router-dom';
import HtmlRenderer from './HtmlRenderer';
import {  CommentApiResponse, ResApiResponse } from '../interface/request/ApiResponse';
import { NetDiskItem } from '../interface/NetDiskItem';
import CommentList from './CommentList';
import { CommentEntity } from '../interface/CommonListItem';
import { LOGIN_ERROR } from '../utils/constValue';

const Detail = () => {
  const [data, setData] = useState<ResourceItem |null>(null);
  const params = useParams()
  const [comments, setComments] = useState<CommentEntity[] >([]);
  const {id}= params
  const typeMap: { [key: number]: string } = {2:"夸克",3:"百度"}
  const navigate = useNavigate();
  useEffect(() => {
    fetchFromApi<ResApiResponse>('/api/res/info?id='+id)
      .then(responseData => {
        setData(responseData.data.info?responseData.data.info:null)
        
        setComments( responseData.data.comments?responseData.data.comments:[])
      })
      .catch(err => {
        console.log(err)
      });
  }, []);
  if(!data){
    return ''
  }

  const handleSendComment = async (content: string) => {
    postData<CommentApiResponse>('/api/comment/add', { resource_item_id: Number(id), content: content}).then((res) => {
      if(res.code == LOGIN_ERROR){
        navigate("/login");
      }else{
        setComments(res.data)
      }
      
  });
};

  const listItems = data.disk_items_array.map((item: NetDiskItem) =>
    <a  href={item.url} className="px-3 py-1 rounded-sm hover:underline dark:bg-violet-600 dark:text-gray-50">
      <button className='mt-2 px-4 py-2 bg-green-500 text-white rounded mr-2'>{typeMap[item.type]}</button></a>
    
  );
  return (
    <div className=' p-2 bo'>
      <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
	<article className="space-y-8 dark:bg-gray-100 dark:text-gray-900">
		<div className="space-y-6">
			<h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{data.name}</h1>
			<div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-600">
				<div className="flex items-center md:space-x-2">
					<img src="https://source.unsplash.com/75x75/?portrait" alt="" className="w-4 h-4 border rounded-full dark:bg-gray-500 dark:border-gray-300" />
					<p className="text-sm">管理员 • {data.create_time_str}</p>
				</div>
				<p className="flex-shrink-0 mt-3 text-sm md:mt-0"> {data.views} views</p>
			</div>
		</div>
		
	</article>
	<div>
		
		<div className="space-y-2">
    <HtmlRenderer htmlString={data.description} />
		</div>
    <div className="space-y-2">
    网盘地址
		</div>
    <div className="flex flex-wrap py-6 gap-2 border-t border-dashed dark:border-gray-600">
    {listItems}
		</div>
    {/* <CommentList  comments ={comments} postId = {Number(params.id)} onSendComment={handleSendComment} /> */}
    <Link to="/"><button className='p-1 bg-green-500 text-white rounded mr-2'>返回</button></Link>
	</div>
</div>
      <p className='font-bold text-lg'></p>
      <div className='leading-10 p-2 max-w-full'>
      
      
      </div>
      
       
        
        
 
      
    </div>
  );
};

export default Detail;
