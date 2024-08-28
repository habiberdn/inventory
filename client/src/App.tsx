import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddProduct from './pages/add_product';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddProduct />} />
      </Routes>
    </Router>
  )
}

export default App
