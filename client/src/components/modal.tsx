import React, { useState } from 'react';

interface ModalProps {
    isClick: boolean;
    category: Array<Array<string>>;
    setValue: (category: string) => void;
    closeModal: () => void;
}

const Modal = ({ isClick, closeModal, category, setValue }: ModalProps) => {
    // State to keep track of the currently clicked parent and child buttons
    const [selectedParent, setSelectedParent] = useState<string | null>(null);
    const [selectedChild, setSelectedChild] = useState<string | null>(null);

    // Function to group items by their parent name
    const groupByParent = (data: Array<Array<string>>): { [key: string]: Array<string> } => {
        const grouped: { [key: string]: Array<string> } = {};

        // Ensure data is an array and not undefined
        if (Array.isArray(data)) {
            data.forEach((item) => {
                if (Array.isArray(item) && item.length >= 2) {
                    const parentName = item[0]; // e.g., 'Kaos' or 'Celana'
                    const childName = item[1]; // e.g., 'Kaos Merah' or 'Jeans'

                    if (grouped[parentName]) {
                        grouped[parentName].push(childName);
                    } else {
                        grouped[parentName] = [childName];
                    }
                }
            });
        }

        return grouped;
    };

    // Group data by parent name
    const groupedCategories = groupByParent(category);

    const handleParentClick = (parentName: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Toggle the parent button; deselect if it was selected, otherwise select it
        setSelectedParent(prev => prev === parentName ? null : parentName);
        setSelectedChild(null); // Reset the selected child when switching parents
    };

    const handleChildClick = (childName: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Set the selected child button
        setSelectedChild(prev => prev === childName ? null : childName);
    };

    // Build the hierarchy display based on the selected parent and child
    const displayHierarchy = () => {
        if (selectedParent && selectedChild) {
            return `${selectedParent} > ${selectedChild}`;
        } else if (selectedParent) {
            return selectedParent;
        }
        return '';
    };

    return (
        <section
            className={`fixed flex justify-center items-center top-0 left-0 w-full h-full bg-[#00000099] ${isClick ? 'block' : 'hidden'
                }`}
        >
            <form className="bg-[#ffff] rounded-xl flex flex-col p-4 w-[60%] h-[80%] gap-2">
                <div className="flex flex-col gap-2">
                    <p className="text-xl">Kategori</p>

                    <div className="flex h-[22rem] border overflow-auto">
                        {/* Parent Buttons Column */}
                        <div className="flex flex-col w-1/2 border-r-2 p-2">
                            {Object.keys(groupedCategories).map((parentName, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`rounded-xl border text-left p-3 w-full flex justify-between items-center ${
                                        selectedParent === parentName ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-700'
                                    }`}
                                    onClick={(e) => handleParentClick(parentName, e)}
                                >
                                    {parentName}
                                    {/* Display ">" icon with color change if there are child components */}
                                    {groupedCategories[parentName].length > 0 && (
                                        <span className={`ml-2 ${selectedParent === parentName ? 'text-blue-500' : 'text-gray-700'}`}>
                                            {'>'}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Child Buttons Column */}
                        <div className="flex flex-col w-1/2 p-2">
                            {selectedParent && groupedCategories[selectedParent] && (
                                <div className="flex flex-col mb-2 p-1 rounded-xl border-gray-300">
                                    {groupedCategories[selectedParent].map((childName, childIndex) => (
                                        <button
                                            key={childIndex}
                                            type="button"
                                            className={`rounded-xl border text-left p-2 w-full mb-1 ${
                                                selectedChild === childName ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-700'
                                            }`}
                                            onClick={(e) => handleChildClick(childName, e)}
                                        >
                                            {childName}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-lg font-semibold mb-2"><span>Dipilih :</span> {displayHierarchy()}</p> {/* Display the hierarchy */}
                </div>
                <div className="flex justify-end gap-2">
                    <button type="button" className="border p-2 rounded-xl" onClick={() => {
                        setValue(displayHierarchy());
                        closeModal()
                    }}>Accept</button>
                    <button type="button" onClick={closeModal} className="border p-2 rounded-xl">
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Modal;
