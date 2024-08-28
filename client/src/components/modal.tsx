import React, { useEffect, useState } from 'react';

interface Category {
    id: number;
    category_name: string;
    path: string;
}

interface ModalProps {
    isClick: boolean;
    category: Category[];
    getValue: (category: string) => void;
    closeModal: () => void;
}

const Modal = ({ isClick, closeModal, category, getValue }: ModalProps) => {
    const [selectedPath, setSelectedPath] = useState<string[]>([]);
    const [groupedCategories, setGroupedCategories] = useState<{ [key: string]: Category[] }>({});

    useEffect(() => {
        const groupByParent = (data: Category[]): { [key: string]: Category[] } => {
            const grouped: { [key: string]: Category[] } = {};
            
            data.forEach((item) => {
                const pathParts = item.path.split('.');
                const parentPath = pathParts.slice(0, -1).join('.'); // Get the immediate parent path
        
                if (!grouped[parentPath]) {
                    grouped[parentPath] = [];
                }
                grouped[parentPath].push(item);  // Push the item to the correct parent path group
            });
            return grouped;
        };
        
        setGroupedCategories(groupByParent(category));
    }, [category]);

    const handleCategoryClick = (
        path: string,
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setSelectedPath((prev) => {
            const level = path.split('.').length - 1; // Determine the level of the clicked category
            console.log('Before Update Selected Path:', prev);
            let newSelectedPath = [...prev];
            newSelectedPath[level] = path; // Set the clicked path at the correct level
            console.log('Updated Path:', newSelectedPath);
            return newSelectedPath.slice(0, level + 1); // Ensure state includes up to the newly clicked level
        });
    };

    const displayHierarchy = () => {
        return selectedPath
        .map((path) => {
            const categoryItem = category.find(cat => cat.path === path);
            return categoryItem ? categoryItem.category_name : '';
        })
        .join(' > ');
    };

    const getCurrentLevelCategories = (level: number) => {
        const currentPath = selectedPath.slice(0, level).join('.');
        
        console.log("Current Path:", currentPath);
        console.log("Selected Path:", selectedPath);
        console.log("Level:", level);
        const lastIndex = selectedPath.length - 1;
        // Return categories grouped by the current path level
        return groupedCategories[currentPath] || groupedCategories[selectedPath[lastIndex]] || [];
    };
    
    const renderCategoryColumn = (level: number) => {
        return (
            <div key={level} className="flex flex-col w-[200px] border-r-2 p-2 overflow-auto">
                {getCurrentLevelCategories(level).map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        className={`rounded-xl border text-left p-3 w-full flex justify-between items-center ${
                            selectedPath[level] === category.path
                                ? 'border-blue-500 text-blue-500'
                                : 'border-gray-300 text-gray-700'
                        }`}
                        onClick={(e) => handleCategoryClick(category.path, e)}
                    >
                        {category.category_name}
                        {groupedCategories[category.path] && groupedCategories[category.path].length > 0 && (
                            <span
                                className={`ml-2 ${
                                    selectedPath[level] === category.path ? 'text-blue-500' : 'text-gray-700'
                                }`}
                            >
                                {'>'}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <section
            className={`fixed flex justify-center items-center top-0 left-0 w-full h-full bg-[#00000099] ${isClick ? 'flex' : 'hidden'
                }`}
        >
            <form className="bg-[#ffff] rounded-xl flex flex-col p-4 w-[100%] h-[80%] gap-2 overflow-auto">
                <div className="flex flex-col gap-2">
                    <p className="text-xl">Kategori</p>

                    <div className="flex h-[22rem] overflow-x-auto ">
                        {/* Dynamically Render Category Levels */}
                        {Array.from({ length: selectedPath.length + 1 }).map((_, level) => (
                            renderCategoryColumn(level)
                        ))}
                    </div>
                    <p className="text-lg font-semibold mb-2">
                        <span>Dipilih :</span> {displayHierarchy()}
                    </p>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="border p-2 rounded-xl"
                        onClick={() => {
                            getValue(selectedPath.join('.'));
                            closeModal();
                        }}
                    >
                        Accept
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="border p-2 rounded-xl"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Modal;
