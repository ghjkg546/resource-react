import { useParams } from "react-router-dom";
import ListItem from "./ListItem";


interface IndexProps {
    keyword:string
  }

const IndexPage:React.FC<IndexProps> = ({keyword}) => {
    const params = useParams()
    const category_id= params.category_id?params.category_id:0
    return (
        <>
            <div className="pt-2 max-w-full">
            <ListItem  categoryId ={category_id} keyword={keyword}></ListItem>
            </div>
            
        </>
      
    );
  };
  
  export default IndexPage;