import { CloseButton } from '@chakra-ui/react';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';

interface SecondVariasiProps {
    click: () => void;
    onVariantNameChange: (name: string) => void;  // Pass the string value instead of event
    onVariantValueChange: (values: string[]) => void;
}

const SecondVariasi = ({ click, onVariantNameChange, onVariantValueChange }: SecondVariasiProps) => {
    const [variantName, setVariantName] = useState<string>('');
    const [inputs, setInputs] = useState<string[]>(['']);

    const handleVariantNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target
        console.log(name,value)
        setVariantName(value);  
        onVariantNameChange(value);  
    };

    const handleChangeInput = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputs = [...inputs];
        newInputs[index] = event.target.value;

        if (event.target.value === '' && index !== inputs.length - 1) {
            newInputs.splice(index, 1);
        } else if (index === inputs.length - 1 && inputs.length < 10 && event.target.value !== '') {
            newInputs.push('');
        }
        setInputs(newInputs);
        onVariantValueChange(newInputs);  
    };

    const handleDeleteInput = (index: number) => () => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);

        if (newInputs.length === 0) {
            newInputs.push('');
        }

        setInputs(newInputs);
        onVariantValueChange(newInputs);
    };

    const handleClose = () => {
        // Reset the states
        setVariantName('');
        setInputs(['']);
        onVariantNameChange('');
        onVariantValueChange(['']);
        click();
    };
    
    return (
        <section className="flex flex-col gap-2">
            <div className='bg-[#f2f2f2] p-2 flex flex-col rounded-md'>
                <div className='flex justify-between border-b-2 p-2'>
                    <input
                        type="text"
                        name="variantName"
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Enter variant title"
                        value={variantName}
                        onChange={handleVariantNameChange}
                    />
                    <CloseButton onClick={handleClose} className='size-2' />
                </div>
                <div className='grid grid-cols-4 p-2 gap-[40px]'>
                    {inputs.map((input, index) => (
                        <div key={index} className='flex items-center pr-2 gap-1'>
                            <input
                                type="text"
                                name={`variantValue`}
                                className="p-2 border border-gray-300 rounded-md"
                                placeholder="Enter variant content"
                                value={input}
                                onChange={handleChangeInput(index)}
                            />
                            <button onClick={handleDeleteInput(index)}>
                                <MdDelete />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SecondVariasi;
