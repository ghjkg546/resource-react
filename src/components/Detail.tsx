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
    <a href={item.url}>
<button className='mt-2 px-4 py-2 bg-green-500 text-white rounded mr-2'>{typeMap[item.type]}</button>
    </a>
  );
  return (
    <div className=' p-2 bo'>
      
      <p className='font-bold text-lg'>{data.name}</p>
      <div className='leading-10 p-2 max-w-full'>
      <HtmlRenderer htmlString={data.description} />
      
      </div>
      <div className='flex mt-2'>
       {listItems}
        <Link to="/"><button className='p-1 bg-green-500 text-white rounded mr-2'>返回</button></Link>
        
      </div>
      <CommentList  comments ={comments} postId = {Number(params.id)} onSendComment={handleSendComment} />
    </div>
  );
};

export default Detail;
