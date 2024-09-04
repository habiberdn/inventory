import { useState, MouseEventHandler, useEffect } from "react";
import axios from "axios";
import { Input } from "../app/ui/input";
import { Textarea } from "../app/ui/textarea";
import Modal from "./modal";

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: string;  
    status: boolean;
}

interface Category {
    id: number;
    category_name: string;
    level: number;
    parentId?: number;
    subcategories?: Category[];
}

const ProductInfo = () => {
    const [digit, setDigit] = useState(0);
    const [isClick, setClick] = useState(false);
    const [category, setCategory] = useState<Category[]>([]);
    const [value, setValue] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        category: "",
        price: "", 
        status: false,
    });

    useEffect(() => {
        axios
            .get<Category[]>("http://localhost:3000/category")
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => console.error("Error fetching category:", error));
    }, []);

    function addFlag(productCategory: string) {
        setValue((prev) => ({
            ...prev,
            category: productCategory,
        }));
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setDigit(value.length);
        setValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClick: MouseEventHandler<HTMLInputElement> = () => {
        setClick(!isClick);
    };

    const closeModal = () => {
        setClick(false);
    };
    return (
        <div className="p-6 bg-white flex flex-col rounded-lg gap-4">
            <p className="text-xl font-bold">Informasi Product</p>
            <div className="flex flex-col gap-2 justify-center p-4 ml-[1rem]">
                <div className="grid w-[70%] items-center gap-1">
                    <label htmlFor="Nama" className="text-sm">Nama Barang</label>
                    <Input type="text" id="Nama" placeholder="Nama Barang" name="name" onChange={handleChangeInput} />
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
    )
}

export default ProductInfo