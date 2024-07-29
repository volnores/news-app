import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import NewsBanner from '../components/NewsBanner/NewsBanner';
import { getNews } from '../api/apiNews';
import NewsList from '../NewsList/NewsList';

const Main = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetctNews = async () => {
      try {
        const response = await getNews();
        setNews(response.news);
      } catch (error) {
        console.log(error);
      }
    };
    fetctNews();
  }, []);

  return (
    <main className={styles.main}>
      {news.length > 0 ? <NewsBanner item={news[29]} /> : null}
      <NewsList news={news} />
    </main>
  );
};

export default Main;
