import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../interface/CategoryItem';
import { CategoryListApiResponse } from '../interface/ApiResponse';
import { fetchFromApi } from '../utils/fetchUtils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [data, setData] = useState<CategoryItem[] >([]);


   // Handler function to hide the element
   const handleLinkClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    fetchFromApi<CategoryListApiResponse>('/api/category/list')
      .then(responseData => setData(responseData.data.list?responseData.data.list:[]))
      .catch(err => {
        console.log(err)
      });
  }, []);

  

  const listItems = data.map((item: CategoryItem) =>
    <Link to={handleUrl(item)} key={item.id} className="text-white block lg:inline-block lg:mt-0 mt-4 px-4 py-2"  onClick={handleLinkClick}>
            {item.name}
          </Link>

  );

  return (
    <nav className="bg-gray-800 p-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/0" onClick={handleLinkClick}>
         <div className="text-white text-xl font-bold">
         
         <a href="#">资源分享</a>
        
        </div></Link>
        
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`lg:flex lg:items-center lg:w-auto hidden`}>
          <a href="#" className="text-white block lg:inline-block lg:mt-0 mt-4 px-4 py-2">
            Home
          </a>
          <a href="#" className="text-white block lg:inline-block lg:mt-0 mt-4 px-4 py-2">
            About
          </a>
          <a href="#" className="text-white block lg:inline-block lg:mt-0 mt-4 px-4 py-2">
            Services
          </a>
          <a href="#" className="text-white block lg:inline-block lg:mt-0 mt-4 px-4 py-2">
            Contact
          </a>
        </div>
      </div>
      {/* mobile nav */}
      <div className={`lg:hidden lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          {listItems}
        </div>
    </nav>
  );
};

export default Navbar;

function handleUrl(item: CategoryItem) {
  return "/" + item.id;
}