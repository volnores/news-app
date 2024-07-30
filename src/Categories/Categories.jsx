import React from 'react';
import styles from './styles.module.css';

const Categories = ({ categories, setSelectedCategory, selectedCategory }) => {
  return (
    <div className={styles.categories}>
      {categories.map((item) => {
        return (
          <button
            onClick={() => setSelectedCategory(item)}
            className={selectedCategory === item ? styles.active : styles.item}
            key={item}>
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
