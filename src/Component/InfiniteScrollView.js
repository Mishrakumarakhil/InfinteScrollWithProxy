import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const API_URL = "app-api/v1/photo-gallery-feed-page/page";
const InfiniteScrollView = ({ searchText }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const filterDataByTitle = (searchText) => {
    const filteredItems = data.filter((item) => {
      if (searchText && item.node) {
        return item.node.title.toLowerCase().includes(searchText.toLowerCase());
      } else {
        return true;
      }
    });
    setFilteredData(filteredItems);
  };

  useEffect(() => {
    filterDataByTitle(searchText);
  }, [searchText, data]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${page}`);
      const newArticles = response.data;

      if (newArticles?.nodes?.length === 0) {
        setHasMore(false);
        return;
      }

      setData([...data, ...newArticles.nodes]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!loading && hasMore) {
        fetchArticles();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <>
      <Card data={filteredData} loading={loading} />
    </>
  );
};
export default InfiniteScrollView;

