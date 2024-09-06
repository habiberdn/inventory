import ProductInfo from "../components/product_info";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import PenjualanInfo from "../components/penjualan_info";

function AddProduct() {

  return (
    <main className="flex flex-col h-screen bg-[#f7f7fe]">
      <div className="flex h-full">
        <Sidebar />
        <div className="flex flex-col w-full gap-4 h-full overflow-hidden">
          <Navbar />
          <div className="p-4 w-full flex flex-col gap-4 overflow-auto">
            <ProductInfo />
            <PenjualanInfo />
            <div className="p-2 bg-white flex flex-col rounded-lg gap-2">
              <div className="flex  gap-4 justify-end p-2 mr-[1rem]">
                <button className="border p-2 px-4 rounded-lg bg-[#21263c] text-white">Save</button>
                <button className="border p-2 rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddProduct;
