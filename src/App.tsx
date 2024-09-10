import './App.css'
import './index.css'
import Navbar from './components/Navbar';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Detail from './components/Detail';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [keyword, setKeyword] = useState<string>('');
  const handleSearch = (searchKeyword: string) => {
    console.log("关键词")
    console.log(searchKeyword)
    setKeyword(searchKeyword);
  };
  return (
    <>
    <div>
   
    <BrowserRouter>
    <Navbar onSearch={handleSearch}/>
			<Routes>
      <Route path="/" element={<IndexPage keyword={keyword} />} />
				<Route path="/:category_id" element={<IndexPage keyword={keyword}/>} />
				<Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
   
    </div>

    </>
  )
}

export default App
