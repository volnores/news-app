import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import NewsBanner from '../components/NewsBanner/NewsBanner';
import { getCategories, getNews } from '../api/apiNews';
import NewsList from '../NewsList/NewsList';
import Skeleton from '../components/Skeleton/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import { useDebounce } from '../helpers/hooks/useDebounce';

const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const totalPage = 10;
  const pageSize = 10;

  const debauncedWords = useDebounce(keywords, 1000);

  const fetchNews = async (currentPage) => {
    try {
      setIsLoading(true);
      const response = await getNews({
        page_number: currentPage,
        category: selectedCategory === 'All' ? null : selectedCategory,
        keywords: debauncedWords,
      });
      setNews(response.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(['All', ...response.categories]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory, debauncedWords]);

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
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Search keywords={keywords} setKeywords={setKeywords} />
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
