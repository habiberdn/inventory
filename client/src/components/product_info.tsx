import { useState, useEffect, MouseEventHandler } from "react";
import axios from "axios";
import { Input } from "../app/ui/input";
import { Textarea } from "../app/ui/textarea";
import Modal from "./modal";
import { Controller, UseFormReturn } from "react-hook-form";
import FormSchema from "@/lib/formSchema";
import { z } from "zod"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/ui/form"
import { Button } from "@/app/ui/button";

interface Product {
    id: number;
    name: string;
    description: string;
    category_name: string;
    price: number;
    status: boolean;
}

interface Category {
    id: number;
    category_name: string;
    level: number;
    parentId?: number;
    subcategories?: Category[];
}

interface Input {
    name?: string;
    description?: string;
    category_name?: string;
    price?: number[];
    amount?: number[];
    variantName?: string[];
    variantValue?: string[][];
    codeVariant?: string[]
    parentId?: number;
}

interface Props {
    getValue: (props: Input) => void;
    form: UseFormReturn<z.infer<typeof FormSchema>>;
    input: Input
}

const ProductInfo = ({ getValue, form, input }: Props) => {
    const [digit, setDigit] = useState(0);
    const [isClick, setClick] = useState(false);
    const [category, setCategory] = useState<Category[]>([]);
    const [value, setValueProduct] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        category_name: "",
        price: 0,
        status: false,
    });

    // Fetch category data
    useEffect(() => {
        axios
            .get<Category[]>("http://localhost:3000/category")
            .then((response) => {
                setCategory(response.data);
            })
            .catch((error) => console.error("Error fetching category:", error));
    }, []);

    useEffect(() => {
        getValue({
            ...value,
            price: [value.price],
        });
    }, [value]); // Add value as a dependency

    function addFlag(productCategory: string) {
        form.setValue('category_name', productCategory);
        setValueProduct((prev) => ({
            ...prev,
            category_name: productCategory,
        }));
    }

    const handleClick: MouseEventHandler<HTMLInputElement> = () => {
        setClick(!isClick);
    };

    const closeModal = () => {
        setClick(false);
    };
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setDigit(value.length);
        setValueProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (
        <div className="p-6 bg-white flex flex-col rounded-lg gap-4">
            <p className="text-xl font-bold">Informasi Product</p>
            <div className="flex flex-col gap-2 justify-center p-4 ml-[1rem]">
                <div className="grid w-[70%] items-center gap-1">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Nama Barang</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Nama Barang"  {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}>

                    </FormField>
                </div>
                <div className="grid w-[70%] items-center gap-1.5 z-20 ">
                    <FormField
                        control={form.control}
                        name="category_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Kategori</FormLabel>
                                <FormControl>
                                    <Controller control={form.control} name="category_name" render={({ field }) => (
                                        <Input
                                            type="text"
                                            {...field}
                                            id="Kategori"
                                            className="text-left"
                                            placeholder="Kategori"
                                            onChange={() => { field.onChange(input.category_name) }}
                                            value={field.value || input.category_name}
                                            onClick={handleClick} // Open the Modal on click
                                        />

                                    )} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                                <div className="flex justify-center items-center">
                                    {isClick && <Modal isClick={isClick} closeModal={closeModal} category={category} getValue={addFlag} />}
                                </div>
                            </FormItem>
                        )}>

                    </FormField>


                </div>
                <div className="grid w-[70%] items-center gap-1.5 ">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>

                        )}>
                    </FormField>
                    <p className="text-right text-[#8E8E8E] text-sm">{digit}/100</p>
                </div>
            </div>
        </div >
    );
};

export default ProductInfo;
