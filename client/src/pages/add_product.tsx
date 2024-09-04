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
            <PenjualanInfo/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddProduct;
