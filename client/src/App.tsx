import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/add_product';
import AddCategory from './pages/add_categories';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new/products" element={<AddProduct />} />
        <Route path="/new/categories" element={<AddCategory/>} />
      </Routes>
    </Router>
  )
}

export default App
