import './App.css'
import './index.css'
import Navbar from './components/Navbar';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Detail from './components/Detail';
import Login from './components/Login';

function App() {
  
  return (
    <>
    <div>
   
    <BrowserRouter>
    <Navbar />
			<Routes>
      <Route path="/" element={<IndexPage />} />
				<Route path="/:category_id" element={<IndexPage />} />
				<Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
   
    </div>

    </>
  )
}

export default App
