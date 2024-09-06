import { useParams } from "react-router-dom";
import ListItem from "./ListItem";

const IndexPage = () => {
    const params = useParams()
    const category_id= params.category_id?params.category_id:0
    return (
        <>
            <div className="pt-2 max-w-full">
            <ListItem  categoryId ={category_id}></ListItem>
            </div>
            
        </>
      
    );
  };
  
  export default IndexPage;