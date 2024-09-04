import './App.css'
import './index.css'
import Navbar from './components/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import Detail from './components/Detail';

function App() {
  
  return (
    <>
    <div>
   
    <BrowserRouter>
    <Navbar />
			<Routes>
      <Route path="/" element={<Navigate to="/0" replace />} />
				<Route path="/:category_id" element={<IndexPage />} />
				<Route path="/detail/:id" element={<Detail />} />
			</Routes>
		</BrowserRouter>
   
    </div>

    </>
  )
}

export default App
