import Sidebar from "../components/sidebar";
import Modal from "../components/modalInsert";
import { useState, MouseEventHandler,useEffect } from "react";
import axios from "axios";

interface Category {
  id: number;
  category_name: string;
  level: number;
  parentId?: number;
  subcategories?: Category[];
}


const AddCategory = () => {
  const [isClick, setClick] = useState(false);
  const [value, setValue] = useState<{ category?: string }>({});
  const [category,setCategory] = useState<Category[]>([])
  const closeModal = () => {
    setClick(false);
  };

  useEffect(() => {
    console.log("Fetching products...");
    axios
        .get("http://localhost:3000/category")
        .then((response) => {
          setCategory(response.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
}, []);

  console.log(category)
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    setClick(!isClick);
  };

  return (
    <main className="flex">
      <Sidebar />
      <div className="flex flex-col p-6">
        <button className="border p-2 rounded-xl" onClick={handleClick}>Add Category</button>
        {isClick && <Modal isClick={isClick} closeModal={closeModal} category={category}  />}

      </div>
    </main>
  );
}

export default AddCategory;
