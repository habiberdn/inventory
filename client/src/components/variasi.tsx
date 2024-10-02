import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import SecondVariasi from './variasi2';
import { CloseButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { Input } from '@/app/ui/input';

interface Variant {
    price: []
    amount: [],
    codeVariant: []
}

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

interface Props {
    click: () => void,
    getValue: (props: Input) => void,
}

const Variasi = ({ click, getValue }: Props) => {
    const [variantValue, setVariantValue] = useState<string[][]>([[''], ['']]);
    const [isClick, setClick] = useState(false);
    const [allVariasi, setAllVariasi] = useState<string[][]>([]);
    const [isImplemented, setIsImplemented] = useState(false);

    const [allValue, setValue] = useState<Input>({
        variantName: "",
        secondVariant: "",
        variantValue: [[""],[""]],
        price: [],
        amount: [],
        codeVariant: []
    })


    const [implVariant, setImplVariant] = useState<Variant>({
        price: [],
        amount: [],
        codeVariant: []
    })

    const handleVariantNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValue((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });

        const updatedValue: Input = {
            ...allValue,
            [name]: value,
        };
        setValue(updatedValue);
        getValue(updatedValue);
    };

    
    useEffect(() => {
        let updatedValue: Input = {
            ...allValue,
            variantValue: [...variantValue],
        };
        getValue(updatedValue);
    }, [variantValue]);
    
    const handleVariantValueChange = (index: number) => (values: string[]) => {
        const newVariantValues = [...variantValue];
        newVariantValues[index] = values;
        setVariantValue(newVariantValues);
    };

    const handleInputChange = (index: number, inputIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        let newValues: any;

        const numValue = Number(value);

        setValue((prev) => {
            const updatedValue = { ...prev, variantValue : [...variantValue]};
            if (name === 'price') {
                const newPrice = [...(updatedValue.price || [])];
                newPrice[index] = numValue;  // Update the value at the correct index
                console.log("price", newPrice)
                updatedValue.price = newPrice;
            } else if (name === 'amount') {
                const newAmount = [...(updatedValue.amount || [])];
                newAmount[index] = numValue;  // Update the value at the correct index
                console.log("amount", newAmount)
                updatedValue.amount = newAmount;
            } else if (name === 'codeVariant') {
                const newCodeVariant = [...(updatedValue.codeVariant || [])];
                newCodeVariant[index] = value;  // Update the value at the correct index
                console.log("codeVariant", newCodeVariant)
                updatedValue.codeVariant = newCodeVariant;
            }
            else {
                console.log("else")
                return {
                    ...prev,
                    [name]: value
                }
            }
            return updatedValue;
        })
        if (inputIndex <= 10 && name !== 'price' && name !== 'amount' && name !== 'codeVariant') {
            newValues = [...variantValue[index]];
            newValues[inputIndex] = value;

            if (newValues && newValues[inputIndex] && newValues.length == inputIndex + 1) {
                newValues.push('');
            }

          
            handleVariantValueChange(index)(newValues);
        }
        console.log(newValues)

        getValue(allValue)
    };

    const handleImplementAll = () => {
        setIsImplemented(!isImplemented);
    };
    // console.log("allValue", allValue)

    const handleImplVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setImplVariant((prev) => ({
            ...prev,
            [name]: name === 'codeVariant' ? value : Number(value),
        }))

    }

    const handleDeleteInput = (index: number, inputIndex: number) => () => {
        const newValues = [...variantValue[index]];
        newValues.splice(inputIndex, 1);

        if (newValues.length === 0) {
            newValues.push('');
        }

        handleVariantValueChange(index)(newValues);
    };

    const getNonEmptyVariantValues = () => {
        return variantValue.map(values => values.filter(value => value.trim() !== ''));
    };

    useEffect(() => {
        setAllVariasi(getNonEmptyVariantValues());

    }, [variantValue]);

    return (
        <section className="flex flex-col gap-4">
            <div className='bg-[#f2f2f2] p-4 flex flex-col rounded-md'>
                <div className='flex justify-between border-b-2 p-4'>

                    <input
                        type="text"
                        name='variantName'
                        className="p-2 border border-gray-300 rounded-md mr-2"
                        placeholder="Enter variant title"
                        value={allValue.variantName}
                        onChange={(e) => handleVariantNameChange(e)}
                    />

                    <CloseButton onClick={click} className='size-2' />
                </div>
                <div className='grid grid-cols-4 p-4 gap-[40px]'>
                    {variantValue[0].map((input, inputIndex) => (
                        <div key={inputIndex} className='flex items-center border pr-2 gap-1'>
                            <input
                                type="text"
                                name="variantValue"
                                className="p-2 border border-gray-300 rounded-md "
                                placeholder="Enter variant content"
                                value={input}
                                onChange={handleInputChange(0, inputIndex)}

                            />
                            <button onClick={handleDeleteInput(0, inputIndex)}><MdDelete /></button>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-[#f2f2f2] p-4 flex flex-col rounded-md'>
                {isClick ? (
                    <SecondVariasi
                        click={() => setClick(!isClick)}
                        onVariantNameChange={(e: ChangeEvent<HTMLInputElement>) => handleVariantNameChange(e)}
                        onVariantValueChange={handleVariantValueChange(1)}
                    />
                ) : (
                    <button className="border-dashed border-2 p-2 hover:border-[#21263c]" onClick={() => setClick(!isClick)}>Add Variasi</button>
                )}
            </div>
            <div className='flex flex-col gap-4'>
                <p className='text-lg'>List Variasi</p>
                <div className='flex gap-4'>
                    <div className='flex'>
                        <div className='flex gap-3 border p-2 justify-center'>
                            <p className='text-sm translate-y-1'>Rp</p>
                            <input type="number" className="border-l-2 pl-2 ring-0 focus:ring-0 focus:outline-none" placeholder='Price' min={0} name='price' onChange={handleImplVariant} />
                        </div>
                        <div className='flex justify-center'>
                            <input type="number" className='border pl-2 pr-2 ring-0 focus:ring-0 focus:outline-none' placeholder='amount' min={0} name='amount' onChange={handleImplVariant} />
                            <input type="text" className='border pl-2 ring-0 focus:ring-0 focus:outline-none' placeholder='Code Variasi' name='codeVariant' onChange={handleImplVariant} />
                        </div>
                    </div>
                    <button className='border rounded-xl p-3 text-sm bg-[#21263c] text-white' onClick={handleImplementAll}>Implement All</button>
                </div>
                <table className="border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <td className="border border-gray-300 p-    2 text-center text-sm w-[110px]">{allValue.variantName || "Variasi 1"}</td>
                            {isClick && <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">
                                {allValue.secondVariant || "Variasi 2"}
                            </td>}
                            <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">Price</td>
                            <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">Amount</td>
                            <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">Code Variasi</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(variantValue[0][0] == ""
                            ? variantValue[0]?.map((value, index) => (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td rowSpan={isClick ? allVariasi[1]?.length || 1 : 1} className="border border-gray-300 p-2 text-center text-sm">
                                            {value}
                                        </td>
                                        {isClick && (
                                            // new blank column after click the first add variasi button
                                            <>
                                                <td className="border border-gray-300 p-2 text-center text-sm">
                                                    {allVariasi[1] && allVariasi[1][0]}
                                                </td>
                                            </>
                                        )} <td className="border border-gray-300 p-2 text-center text-sm">
                                            <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" name='price' value={isImplemented ? implVariant.price : value[index]} onChange={handleInputChange(0, 11)} />
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                            <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" name='amount' value={isImplemented ? implVariant.amount : undefined} onChange={handleInputChange(0, 11)} />
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                            <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" name='codeVariant' value={isImplemented ? implVariant.codeVariant : undefined} onChange={handleInputChange(0, 11)} />
                                        </td>
                                    </tr>

                                </React.Fragment>
                            )) :
                            (
                                (isClick && allVariasi[1].length > 0) ?
                                    (
                                        variantValue[0]?.slice(0, -1).map((value, index) => (
                                            allVariasi[1]?.map((value1, index1) => (
                                                <tr key={index * allVariasi[1].length + index1}>
                                                    {index1 == 0 && (
                                                        <td rowSpan={isClick ? allVariasi[1]?.length || 1 : 1} className="border border-gray-300 p-2 text-center text-sm">
                                                            {value}
                                                        </td>
                                                    )}
                                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                                        {value1}
                                                    </td>
                                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                                        <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" value={isImplemented && !!click ? implVariant.price : undefined} name='price' onChange={handleInputChange(index * allVariasi[1].length + index1, 11)} required={!!click} />
                                                    </td>
                                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                                        <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" value={isImplemented ? implVariant.amount : undefined} name='amount' onChange={handleInputChange(index * allVariasi[1].length + index1, 11)} required={!!click} />
                                                    </td>
                                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                                        <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" value={isImplemented ? implVariant.codeVariant : undefined} name='codeVariant' onChange={handleInputChange(index * allVariasi[1].length + index1, 0)} required={!!click} />
                                                    </td>
                                                </tr>
                                            ))))) :
                                    (
                                        variantValue[0]?.slice(0, -1).map((value, index) => (
                                            <>
                                                <tr>
                                                    <td rowSpan={isClick ? allVariasi[1]?.length || 1 : 1} className="border border-gray-300 p-2 text-center text-sm">
                                                        {value}
                                                    </td>
                                                    {isClick && (
                                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                                        </td>
                                                    )}
                                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                                        <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" value={isImplemented ? implVariant.price : undefined} name='price' onChange={handleInputChange(index, 0)} required={!!click} />
                                                    </td>
                                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                                        <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" value={isImplemented ? implVariant.amount : undefined} name='amount' onChange={handleInputChange(index, 0)} required={!!click} />
                                                    </td>
                                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                                        <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" value={isImplemented ? implVariant.codeVariant : undefined} name='codeVariant' onChange={handleInputChange(index, 0)} required={!!click} />
                                                    </td>
                                                </tr>
                                            </>
                                        ))))
                        )}
                    </tbody>
                </table>
            </div>

        </section >
    );
};

export default Variasi;