import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface Category {
  id: number;
  category_name: string;
  level: number;
  parentId?: number;
  subcategories?: Category[];
}

interface ModalProps {
  isClick: boolean;
  category: Category[];
  getValue: (category: string) => void;
  closeModal: () => void;
}

const Modal = ({ isClick, closeModal, category, getValue }: ModalProps) => {
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [groupedCategories, setGroupedCategories] = useState<{ [key: number]: Category[] }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const flattenCategories = (data: Category[], parentId: number | null = null, level: number = 0): Category[] => {
      return data.reduce<Category[]>((acc, item) => {
        const flattenedItem = { ...item, parentId: parentId ?? 0, level };
        acc.push(flattenedItem);
        if (item.subcategories) {
          acc = acc.concat(flattenCategories(item.subcategories, item.id, level + 1));
        }
        return acc;
      }, []);
    };

    const flattenedCategories = flattenCategories(category);
    setCategories(flattenedCategories);
  }, [category]);

  useEffect(() => {
    const groupByParent = (data: Category[]): { [key: number]: Category[] } => {
      const grouped: { [key: number]: Category[] } = {};

      data.forEach((item) => {
        const parentId = item.parentId ?? 0; // Default to 0 if parentId is undefined

        if (!grouped[parentId]) {
          grouped[parentId] = [];
        }
        grouped[parentId].push(item);
      });
      return grouped;
    };

    setGroupedCategories(groupByParent(categories));
  }, [categories]);

  const handleCategoryClick = (id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const level = categories.find((cat) => cat.id === id)?.level ?? 0;
  
    // If the category is already selected, unselect it by removing it from the path
    if (selectedPath.includes(id)) {
      setSelectedPath((prev) => prev.filter((pathId) => pathId !== id));
    } else {
      // Otherwise, add it to the path
      const newSelectedPath = [...selectedPath.slice(0, level), id];
      setSelectedPath(newSelectedPath);
    }
  };

  const displayHierarchy = () => {
    return selectedPath
      .map((id) => {
        const categoryItem = categories.find((cat) => cat.id === id);
        return categoryItem ? categoryItem.category_name : '';
      })
      .join(' > ');
  };

  const getCurrentLevelCategories = (level: number) => {
    const parentId = selectedPath[level - 1] ?? 0;
    return groupedCategories[parentId] || [];
  };

  const renderCategoryColumn = (level: number) => {
    return (
      <div key={level} className="flex flex-col w-[250px] gap-3 border-r-2 p-2 overflow-auto ">
        {getCurrentLevelCategories(level).map((category) => (
          <button
            key={category.id}
            type="button"
            className={`rounded-xl border text-left p-4 w-full flex justify-between items-center  ${
              selectedPath[level] === category.id ? 'border-blue-500 text-blue-500' : 'border-black text-black'
            }`}
            onClick={(e) => handleCategoryClick(category.id, e)}
          >
            {category.category_name}
            {/* Show the '>' icon if this category has subcategories */}
            {groupedCategories[category.id] && groupedCategories[category.id].length > 0 && (
              <span className="ml-2 text-black">{'>'}</span>
            )}
          </button>
        ))}
      </div>
    );
  };

  const buildHierarchy = (categories: Category[], parentId: number | undefined = undefined): Category[] => {
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) => ({
        ...category,
        subcategories: buildHierarchy(categories, category.id),
      }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:3000/category');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const validateSelection = () => {
    // Check if the last selected category has no subcategories
    const lastSelectedId = selectedPath[selectedPath.length - 1];
    const lastCategory = categories.find((cat) => cat.id === lastSelectedId);
    
    if (!lastCategory || groupedCategories[lastCategory.id]?.length > 0) {
      // If the last selected category has subcategories, validation fails
      toast.error("Please select down to the last child category.");
      console.error("Validation Error: Please select down to the last child category.");
      return false;
    }
    return true;
  };

  const handleAccept = async () => {
    if (!validateSelection()) {
      return;
    }
  
    try {
      const hierarchicalData = buildHierarchy(categories);

      console.log('Hierarchical Data:', hierarchicalData);

      getValue(displayHierarchy())
      console.log('Selected Path:', displayHierarchy());

      closeModal();
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  return (
    <section
      className={`fixed flex justify-center items-center top-0 left-0 w-full h-full bg-[#00000099] ${
        isClick ? 'flex' : 'hidden'
      }`}
    >
      <form className="bg-[#ffff] rounded-xl flex flex-col p-4 w-[60%] h-[90%] gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-xl">Kategori</p>

          <div className="flex h-[22rem] overflow-x-auto overflow-y-hidden w-full">
            {Array.from({ length: selectedPath.length + 1 }).map((_, level) => renderCategoryColumn(level))}
          </div>
          <p className="text-lg font-semibold mb-2">
            <span>Dipilih :</span> {displayHierarchy()}
          </p>
          {/* Display the feedback message */}
          <Toaster />
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className="border p-2 rounded-xl" onClick={handleAccept}>
            Accept
          </button>
          <button type="button" onClick={closeModal} className="border p-2 rounded-xl">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default Modal;
