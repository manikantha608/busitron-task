
import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {

  const [selectedCategories, setSelectedCategories] = useState([]);

  const updateSelectedCategories = (category) => {
    setSelectedCategories((prevCategories) => {
  
      if (prevCategories.some((cat) => cat.id === category.id)) {
        return prevCategories.filter((cat) => cat.id !== category.id);
      }
      
      return [...prevCategories, category];
    });
  };

  return (
    <CategoryContext.Provider value={{ selectedCategories, updateSelectedCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};



