import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/add_product';
import AddCategory from './pages/add_categories';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new/products" element={<AddProduct />} />
        <Route path="/new/categories" element={<AddCategory/>} />
        <Route path="/" element={<Home/>} />

      </Routes>
    </Router>
  )
}

export default App
