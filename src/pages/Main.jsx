import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import NewsBanner from '../components/NewsBanner/NewsBanner';
import { getNews } from '../api/apiNews';
import NewsList from '../NewsList/NewsList';
import Skeleton from '../components/Skeleton/Skeleton';

const Main = () => {
  const [news, setNews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetctNews = async () => {
      try {
        setIsLoading(true);
        const response = await getNews();
        setNews(response.news);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetctNews();
  }, []);

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? <NewsBanner item={news[29]} /> : <Skeleton />}
      {!isLoading ? <NewsList news={news} /> : <Skeleton />}
    </main>
  );
};

export default Main;
