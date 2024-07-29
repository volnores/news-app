import React from 'react';
import styles from './styles.module.css';

const NewsItem = ({ item }) => {
  return (
    <li className={styles.item}>
      <div className={styles.wrapper} style={{ backgroundImage: `url(${item.image})` }}></div>
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.extra}>
          {item.published.slice(0, 16)} by {item.author}
        </p>
      </div>
    </li>
  );
};

export default NewsItem;
