import  { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/fetchUtils';
import { ResourceItem } from '../interface/ResourceItem';
import { Link, useParams } from 'react-router-dom';
import HtmlRenderer from './HtmlRenderer';
import {  ResApiResponse } from '../interface/ApiResponse';
import { NetDiskItem } from '../interface/NetDiskItem';

const Detail = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ResourceItem |null>(null);
  const params = useParams()
  const {id}= params
  const typeMap: { [key: number]: string } = {2:"夸克",3:"百度"}
  
  useEffect(() => {
    fetchFromApi<ResApiResponse>('/api/res/info?id='+id)
      .then(responseData => setData(responseData.data?responseData.data:null))
      .catch(err => {
        console.log(err)
      });
  }, []);
  if(!data){
    return ''
  }

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
    </div>
  );
};

export default Detail;
