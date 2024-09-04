import { useParams } from "react-router-dom";
import ListItem from "./ListItem";

const IndexPage = () => {
    // const [isOpen, setIsOpen] = useState(false);
  
    // const toggleMenu = () => {
    //   setIsOpen(!isOpen);
    // };
    const params = useParams()
    console.log("params:",params);
    const category_id= params.category_id?params.category_id:0
    console.log('id',category_id)
    return (

        <>
            <div className="pt-2 max-w-full">
            <ListItem  categoryId ={category_id}></ListItem>
            </div>
            
        </>
      
    );
  };
  
  export default IndexPage;