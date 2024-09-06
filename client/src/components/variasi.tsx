import React from 'react';
import { useState, useEffect } from 'react';
import SecondVariasi from './variasi2';
import { CloseButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

interface Variant {
    price: 0
    stock: 0,
    code: ""
}

const Variasi = ({ click }: { click: () => void }) => {
    const [variantName, setVariantName] = useState<string[]>(['', '']);
    const [variantValue, setVariantValue] = useState<string[][]>([[''], ['']]);
    const [isClick, setClick] = useState(false);
    const [allVariasi, setAllVariasi] = useState<string[][]>([]);
    const [isImplemented, setIsImplemented] = useState(false);
    const [implVariant, setImplVariant] = useState<Variant>({
        price: 0,
        stock: 0,
        code: ""
    })

    const handleVariantNameChange = (index: number) => (name: string) => {
        const newVariantNames = [...variantName];
        newVariantNames[index] = name;
        setVariantName(newVariantNames);
    };

    const handleImplementAll = () => {
        setIsImplemented(!isImplemented);
    };

    const handleVariantValueChange = (index: number) => (values: string[]) => {
        const newVariantValues = [...variantValue];
        newVariantValues[index] = values;
        setVariantValue(newVariantValues);
    };

    const handleInputChange = (index: number, inputIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = [...variantValue[index]];
        newValues[inputIndex] = e.target.value;
        if (newValues[inputIndex] && newValues.length == inputIndex + 1) {
            newValues.push('');
        }

        handleVariantValueChange(index)(newValues);
    };

    const handleimplVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setImplVariant((prev) => ({
            ...prev,
            [name]: name === 'code' ? value : Number(value),
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
console.log(variantValue)
return (
    <section className="flex flex-col gap-4">
        <div className='bg-[#f2f2f2] p-4 flex flex-col rounded-md'>
            <div className='flex justify-between border-b-2 p-4'>
                <input
                    type="text"
                    name="variantName"
                    className="p-2 border border-gray-300 rounded-md mr-2"
                    placeholder="Enter variant title"
                    value={variantName[0]}
                    onChange={(e) => handleVariantNameChange(0)(e.target.value)}
                />
                <CloseButton onClick={click} className='size-2' />
            </div>
            <div className='grid grid-cols-4 p-4 gap-[40px]'>
                {variantValue[0].map((input, inputIndex) => (
                    <div key={inputIndex} className='flex items-center border pr-2 gap-1'>
                        <input
                            type="text"
                            name={`variantValue-${inputIndex}`}
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
                    onVariantNameChange={handleVariantNameChange(1)}
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
                        <input type="number" className="border-l-2 pl-2 ring-0 focus:ring-0 focus:outline-none" placeholder='Price' min={0} name='price' onChange={handleimplVariant} />
                    </div>
                    <div className='flex justify-center'>
                        <input type="number" className='border pl-2 pr-2 ring-0 focus:ring-0 focus:outline-none' placeholder='Stock' min={0} name='stock' onChange={handleimplVariant} />
                        <input type="text" className='border pl-2 ring-0 focus:ring-0 focus:outline-none' placeholder='Code Variasi' name='code' onChange={handleimplVariant} />
                    </div>
                </div>
                <button className='border rounded-xl p-3 text-sm bg-[#21263c] text-white' onClick={handleImplementAll}>Implement All</button>
            </div>
            <table className="border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">{variantName[0] || "Variasi 1"}</td>
                        {isClick && <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">
                            {variantName[1] || "Variasi 2"}
                        </td>}
                        <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">Price</td>
                        <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">Stock</td>
                        <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">Code Variasi</td>
                    </tr>
                </thead>
                <tbody>
                    {variantValue[0]?.map((value, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan={isClick ? allVariasi[1]?.length || 1 : 1} className="border border-gray-300 p-2 text-center text-sm">
                                    {value}
                                </td>
                                {isClick ? (
                                    <>
                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                            {allVariasi[1] && allVariasi[1][0]}
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                            <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0"    value={isImplemented ? implVariant.price : undefined}/>
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                            <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0"  value={isImplemented ? implVariant.stock : undefined}/>
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                            <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" value={isImplemented ? implVariant.code : undefined} />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                            <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" />
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                            <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" />
                                        </td>
                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                            <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" />
                                        </td>
                                    </>
                                )}
                            </tr>
                            {isClick && allVariasi[1]?.slice(1).map((secondValue, secondIndex) => (
                                <tr key={`${index}-${secondIndex}`}>
                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                        {secondValue}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                        <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" />
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                        <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" />
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center text-sm">
                                        <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" />
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>

    </section>
);
};

export default Variasi;


