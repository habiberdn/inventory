import axios from "axios";
import { useEffect, useState, MouseEventHandler } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Input } from "../app/ui/input";
import { Textarea } from "../app/ui/textarea";
import Modal from "../components/modal";

// Interfaces for Product and Category
interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  status: boolean;
}

interface Category {
  id: number;
  category_name: string;
  level: number;
  parentId?: number;
  subcategories?: Category[];
}

function AddProduct() {
  const [digit, setDigit] = useState(0);
  const [isClick, setClick] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [value, setValue] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    category: "",
    status: false,
  });
  const [category, setCategory] = useState<Category[]>([]); // Change type to Category[]

  function addFlag(productCategory: string) {
    setValue((prev) => {
      return {
        ...prev,
        category: productCategory,
      };
    });
  }
  console.log(value);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setDigit(value.length);
    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log("Fetching products...");
    axios
      .get<Product[]>("http://localhost:3000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    axios
      .get<Category[]>("http://localhost:3000/category") // Update the type to Category[]
      .then((response) => {
        setCategory(response.data); // Ensure the data matches the Category type
      })
      .catch((error) => console.error("Error fetching category :", error));
  }, []);
  console.log(category);
  
  const handleClick: MouseEventHandler<HTMLInputElement> = () => {
    setClick(!isClick);
  };

  const closeModal = () => {
    setClick(false);
  };

  return (
    <main className="flex flex-col h-screen bg-[#f7f7fe]">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex flex-col w-full gap-4 h-full overflow-hidden">
          <Navbar />
          <div className="p-4 w-full flex flex-col gap-4 overflow-auto">
            <div className="p-6 bg-white flex flex-col rounded-lg gap-2">
              <p className="text-xl font-bold">Informasi Product</p>
              <div className="flex flex-col gap-2 justify-center p-4 ml-[1rem]">
                <div className="grid w-[70%] items-center gap-1">
                  <label htmlFor="Nama" className="text-sm">Nama Barang</label>
                  <Input type="email" id="Nama" placeholder="Nama Barang" name="name" onChange={handleChangeInput} />
                </div>
                <div className="grid w-[70%] items-center gap-1.5 z-20 h-[4rem]">
                  <label htmlFor="Kategori" className="text-sm">Kategori</label>
                  <Input type="text" id="Kategori" placeholder="Kategori" onClick={handleClick} name="category" onChange={handleChangeInput} value={value.category} />
                  <div className="flex justify-center items-center">
                    {isClick && <Modal isClick={isClick} closeModal={closeModal} category={category} getValue={addFlag} />}
                  </div>
                </div>
                <div className="grid w-[70%] items-center gap-1.5">
                  <label htmlFor="Deskripsi" className="text-sm">Deskripsi Barang</label>
                  <Textarea id="Deskripsi" placeholder="Deskripsi Barang" onChange={handleTextAreaChange} maxLength={100} name="description" />
                  <p className="text-right text-[#8E8E8E] text-sm">{digit}/100</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white flex flex-col rounded-lg gap-2">
              <p className="text-xl font-bold">Informasi Penjualan</p>
              <div className="flex flex-col gap-2 justify-center p-2 ml-[1rem]">
                <div className="flex w-[70%] gap-4 items-center">
                  <label htmlFor="variasi" className="text-sm">Variasi</label>
                  <button className="border-dashed border-2 p-2">Variasi</button>
                </div>
                <div className="grid w-[70%] items-center gap-1.5">
                  <label htmlFor="Price" className="text-sm">Price</label>
                  <Input type="text" id="Price" placeholder="Price" onClick={handleClick} name="Price" onChange={handleChangeInput} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddProduct;
