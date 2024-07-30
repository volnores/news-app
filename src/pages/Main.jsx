import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import NewsBanner from '../components/NewsBanner/NewsBanner';
import { getNews } from '../api/apiNews';
import NewsList from '../NewsList/NewsList';
import Skeleton from '../components/Skeleton/Skeleton';
import Pagination from '../components/Pagination/Pagination';

const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 10;
  const pageSize = 10;

  const fetctNews = async (currentPage) => {
    try {
      setIsLoading(true);
      const response = await getNews(currentPage, pageSize);
      setNews(response.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetctNews(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > totalPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? <NewsBanner item={news[29]} /> : <Skeleton />}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPage={totalPage}
        currentPage={currentPage}
      />
      {!isLoading ? <NewsList news={news} /> : <Skeleton />}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPage={totalPage}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Main;
