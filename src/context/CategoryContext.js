
import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const updateSelectedCategories = (newSelection) => {
    setSelectedCategories(newSelection);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategories, updateSelectedCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
