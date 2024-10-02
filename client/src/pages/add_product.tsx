import ProductInfo from "../components/product_info";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import PenjualanInfo from "../components/penjualan_info";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

interface Input {
  name?: string;
  description?: string;
  category_name?: string;
  price?: number[];
  amount?: number[];
  variantName?: string;
  secondVariant?: string;
  variantValue?: string[][];
  codeVariant?: string[]
  parentId?: number;
}

function AddProduct() {
  const [input, setInput] = useState<Input>({
    name: "",
    description: "",
    category_name: "",
    price: [],
    amount: [],
    codeVariant: [],
    variantName: "",
    secondVariant: "",
    variantValue: [[""]],
    parentId: 0
  })

  const getValue = (input: Input) => {
    setInput((prev) => ({
      ...prev,
      ...input,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {

      console.log(input)
      const createData = await axios.post('http://localhost:3000/products', input)
      console.log(createData.data)
      toast.success('Successfully Created!')

    } catch (error) {
      toast.error("This didn't work.")

      console.log(error)
    }
  }
  console.log(input)

  return (
    <main className="flex flex-col h-screen bg-[#f7f7fe]">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex flex-col w-full gap-4 h-full overflow-hidden">
          <Navbar />
          <div className="p-4 w-full flex flex-col gap-4 overflow-auto">
            <form onSubmit={handleSubmit}>
              <ProductInfo getValue={getValue} />
              <PenjualanInfo getValue={getValue} />
              <Toaster />

              <div className="p-2 bg-white flex flex-col rounded-lg gap-2">
                <div className="flex  gap-4 justify-end p-2 mr-[1rem]">
                  <button className="border p-2 px-4 rounded-lg bg-[#21263c] text-white" type="submit">Save</button>
                  <button className="border p-2 rounded-lg">Cancel</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddProduct;