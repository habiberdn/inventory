import { useState, useEffect } from "react";
import axios from "axios";
import Variasi from "./variasi";
import { Input } from "../app/ui/input";

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: string;  // Added price field
    status: boolean;
}

const PenjualanInfo = () => {
    const [isVariantClick, setVarianClick] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const [value, setValue] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        category: "",
        price: "", // Initialized price field
        status: false,
    });

    useEffect(() => {
        axios
            .get<Product[]>("http://localhost:3000/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleClickVariant = () => {
        setVarianClick(!isVariantClick);
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <div className="p-6 bg-white flex flex-col rounded-lg gap-2">
            <p className="text-xl font-bold">Informasi Penjualan</p>
            <div className="flex flex-col gap-4 justify-center p-2 ml-[1rem]">
                <label htmlFor="variasi" className="text-sm font-sans">Variasi</label>
                {isVariantClick ? (
                    <Variasi click={handleClickVariant} />
                ) : (
                    <div className="flex flex-col gap-2">
                        <button className="border-dashed border-2 p-2 hover:border-[#21263c] font-sans" onClick={handleClickVariant}>Add Variasi</button>
                        <label htmlFor="Price" className="text-sm font-sans">Price</label>
                        <Input type="text" id="Price" placeholder="Price" name="price" onChange={handleChangeInput} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PenjualanInfo