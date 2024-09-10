import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../interface/CategoryItem';
import { CategoryListApiResponse } from '../interface/request/ApiResponse';
import { fetchFromApi } from '../utils/fetchUtils';

interface NavbarProps {
  onSearch: (keyword: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);

  };

  const handleSeach = () => {
    onSearch(keyword)
  };


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [data, setData] = useState<CategoryItem[]>([]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    fetchFromApi<CategoryListApiResponse>('/api/category/list')
      .then(responseData => setData(responseData.data.list ? responseData.data.list : []))
      .catch(err => {
        console.log(err)
      });
  }, []);

  const listItemsPc = data.map((item: CategoryItem) =>
    <Link to={handleUrl(item)} key={item.id} className="text-white block lg:inline-block lg:mt-0 mt-4 px-4 py-2" onClick={handleLinkClick}>
      {item.name}
    </Link>

  );

  const listItems = data.map((item: CategoryItem) =>
    <Link to={handleUrl(item)} key={item.id} className="text-white block lg:inline-block lg:mt-0 mt-4 px-4 py-2" onClick={handleLinkClick}>
      {item.name}
    </Link>

  );

  return (
    <nav className="bg-gray-800 p-2 min-w-full">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/0" onClick={handleLinkClick}>
          <div className="text-white text-xl font-bold">

            <a href="#">资源分享</a>

          </div></Link>
        <div className="flex space-x-4">

          <div className="relative text-gray-600  space-x-4">
            <input
              type="search"
              name="serch"
              onChange={handleChange}
              placeholder="Search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4" onClick={handleSeach}>

              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"

                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
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
        </div>

        <div className={`lg:flex lg:items-center lg:w-auto hidden`}>

          {listItemsPc}
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