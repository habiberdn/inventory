import React from 'react';
import { useState, useEffect } from 'react';
import SecondVariasi from './variasi2';
import { CloseButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { Console } from 'console';

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
    variantName?: string[];
    variantValue?: string[][];
    codeVariant?: string[]
    parentId?: number;
}

const Variasi = ({ click, getValue }: { click: () => void, getValue: (props: Input) => void }) => {
    const [variantName, setVariantName] = useState<string[]>(['']);
    const [variantValue, setVariantValue] = useState<string[][]>([[''], ['']]);
    const [isvariant2, setClick] = useState(false);
    const [allVariasi, setAllVariasi] = useState<string[][]>([]);
    const [isImplemented, setIsImplemented] = useState(false);
    const [implVariant, setImplVariant] = useState<Variant>({
        price: [],
        amount: [],
        codeVariant: []
    })
    const [value, setValue] = useState<Input>({
        variantName: [],
        variantValue: [[]],
        price: [],
        amount: [],
        codeVariant: []
    })

    const handleVariantNameChange = (index: number) => (newValue: string) => {
        const newVariantNames = [...variantName];
        newVariantNames[index] = newValue;
        setVariantName(newVariantNames);

        const updatedValue: Input = {
            ...value,
            variantName: newVariantNames,
        };
        setValue(updatedValue);
        getValue(updatedValue);
    };
    const handleVariantValueChange = (index: number) => (values: string[]) => {
        const newVariantValues = [...variantValue];
        newVariantValues[index] = values;
        setVariantValue(newVariantValues);
        let updatedValue: Input = {
            ...value,
            variantValue: [...newVariantValues],
        };

        getValue(updatedValue);
    };

    const handleImplementAll = () => {
        setIsImplemented(!isImplemented);
    };

    const handleInputChange = (index: number, inputIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const newValues = [...variantValue[index]];
        newValues[inputIndex] = value;

        setValue((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (newValues[inputIndex] && newValues.length == inputIndex + 1) {
            newValues.push('');
        }

        handleVariantValueChange(index)(newValues);
    };

    const handleTableInput = (index: number, var2: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        console.log(index, var2)


        setValue((prev) => {
            // Copy the previous values
            const updatedValues = [...(prev[name as keyof Input] as any[])];

            // If the value array for this input doesn't exist, create it
            if (!updatedValues[index]) {
                updatedValues[index] = [];
            }

            // Update the value at the specific index
            updatedValues[index] = value;

            return {
                ...prev,
                [name]: updatedValues,
            };
        });

    }
    // console.log(value)
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
    }, [variantValue, value]);

    // console.log("variantValue : ", variantValue)
    // console.log("allvariasi : ", allVariasi)
     let vn1 :number = 0;

    console.log(allVariasi)

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
                {isvariant2 ? (
                    <SecondVariasi
                        click={() => setClick(!isvariant2)}
                        onVariantNameChange={(value: string) => handleVariantNameChange(1)(value)}
                        onVariantValueChange={handleVariantValueChange(1)}

                    />
                ) : (
                    <button className="border-dashed border-2 p-2 hover:border-[#21263c]" onClick={() => setClick(!isvariant2)}>Add Variasi</button>
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
                <table className="border-collapse border border-gray-300" id='mytable'>
                    <thead>
                        <tr>
                            <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">{variantName[0] || "Variasi 1"}</td>
                            {isvariant2 && <td className="border border-gray-300 p-2 text-center text-sm w-[110px]">
                                {variantName[1] || "Variasi 2"}
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
                                        <td rowSpan={isvariant2 ? allVariasi[1]?.length || 1 : 1} className="border border-gray-300 p-2 text-center text-sm">
                                            {value}
                                        </td>
                                        {isvariant2 ? (

                                            // new blank column after click the first add variasi button
                                            <>
                                                <td className="border border-gray-300 p-2 text-center text-sm">
                                                    {allVariasi[1] && allVariasi[1][0]}
                                                </td>
                                                <td className="border border-gray-300 p-2 text-center text-sm">
                                                    <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" name='price' value={isImplemented ? implVariant.price : undefined} />
                                                </td>
                                                <td className="border border-gray-300 p-2 text-center text-sm">
                                                    <input type="number" min={0} name='amount' className="w-full border p-2 rounded-lg" placeholder="0" value={isImplemented ? implVariant.amount : undefined} />
                                                </td>
                                                <td className="border border-gray-300 p-2 text-center text-sm">
                                                    <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" name='codeVariant' value={isImplemented ? implVariant.codeVariant : undefined} />
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                {/* if variant 2 is null*/}
                                                <td className="border border-gray-300 p-2 text-center text-sm">
                                                    <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" name='price' value={isImplemented ? implVariant.price : value[index]} />
                                                </td>
                                                <td className="border border-gray-300 p-2 text-center text-sm">
                                                    <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" name='amount' value={isImplemented ? implVariant.amount : undefined} />
                                                </td>
                                                <td className="border border-gray-300 p-2 text-center text-sm">
                                                    <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" name='codeVariant' value={isImplemented ? implVariant.codeVariant : undefined} />
                                                </td>
                                            </>
                                        )}
                                    </tr>

                                </React.Fragment>
                            ))
                            : allVariasi[0].map((var1, index1) => (
                                // if variant 1 filled (static new blank column)
                                <React.Fragment key={index1} >
                                    {/* </React.Fragment>{(isvariant2 && allVariasi[1].length >1) ? ( */}
                                    {(isvariant2) ? (
                                        <>
                                   {vn1 = vn1+1}

                                            {allVariasi[1]?.map((var2, index2) => {
                                                    // {vn1 = vn1+1}

                                                {
                                                    {<p>uh4uth4u</p>}
                                                    <tr >
                                                        {vn1 == 1 && (
                                                            <td
                                                                rowSpan={isvariant2 ? allVariasi[1]?.length || 1 : 1} className="border border-gray-300 p-2 text-center text-sm">
                                                                {var1}
                                                            </td>
                                                        )}
                                                        
                                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                                                {var2}
                                                            </td>
                                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                                            <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" value={isImplemented ? implVariant.price : undefined} name='price' onChange={handleTableInput(index2, var2)} />
                                                        </td>
                                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                                            <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" value={isImplemented ? implVariant.amount : undefined} name='amount' onChange={handleTableInput(index2, var2)} />
                                                        </td>
                                                        <td className="border border-gray-300 p-2 text-center text-sm">
                                                            <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" value={isImplemented ? implVariant.codeVariant : undefined} name='codeVariant' onChange={handleTableInput(index2, var2)} />
                                                        </td>
                                                    </tr>
                                                        { console.log(var2 + "; " + index2) }

                                                }

                                            })}

                                        </>
                                    ) 
                                    : (
                                        // if variantValue 1 filled but variant2 value didnt clicked
                                        <tr >
                                            <td
                                                rowSpan={isvariant2 ? allVariasi[1]?.length || 1 : 1} className="border border-gray-300 p-2 text-center text-sm">
                                                {var1}
                                            </td>


                                            <td className="border border-gray-300 p-2 text-center text-sm">
                                                <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" name='price' />
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center text-sm">
                                                <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" name='amount' />
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center text-sm">
                                                <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" name='codeVariant' />
                                            </td>
                                        </tr>
                                    )}
                                    {/* {isvariant2 && allVariasi[1]?.slice(1).map((secondValue, secondIndex) => (
                                        <tr key={`${index}-${secondIndex}`}>
                                            <td className="border border-gray-300 p-2 text-center text-sm">
                                                {secondValue}
                                                x       </td>
                                            <td className="border border-gray-300 p-2 text-center text-sm">
                                                <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" value={isImplemented ? implVariant.price : undefined} name='price' onChange={handleTableInput(secondIndex)} />
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center text-sm">
                                                <input type="number" min={0} className="w-full border p-2 rounded-lg" placeholder="0" value={isImplemented ? implVariant.amount : undefined} name='amount' onChange={handleTableInput(index + secondIndex)} />
                                            </td>
                                            <td className="border border-gray-300 p-2 text-center text-sm">
                                                <input type="text" className="w-full border p-2 rounded-lg" placeholder="Input Code Variasi" value={isImplemented ? implVariant.codeVariant : undefined} name='codeVariant' onChange={handleTableInput(index + secondIndex)} />
                                            </td>
                                        </tr>
                                    ))} */}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </section >
    );
};

export default Variasi;