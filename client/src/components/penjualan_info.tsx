import { useState, useEffect } from "react";
import Variasi from "./variasi";
import { Input } from "../app/ui/input";

interface Product {
    id: number;
    name?: string;
    description?: string;
    category_name?: string;
    price?: number;
    amount?: number;
    variantName?: string;
    variantValue?: string[];
    parentId?: number;
}

interface Input {
    name?: string;
    description?: string;
    category_name?: string;
    price?: number[][];
    amount?: number[][];
    variantName?: string[];
    variantValue?: string[][];
    codeVariant?: string[][]
    parentId?: number;
  }

const PenjualanInfo =  ({ getValue }: { getValue: (input: Input) => void }) => {
    const [isVariantClick, setVarianClick] = useState(false);
    const [value, setValue] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        category_name: "",
        price: 0, // Initialized price field
        variantName : "",
        variantValue : []
    });

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
                <label htmlFor="variasi" className="text-lg font-sans">Variasi</label>
                {isVariantClick ? (
                    <Variasi click={handleClickVariant} getValue={getValue} />
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