import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const InfiniteScrollView = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const API_URL = "app-api/v1/photo-gallery-feed-page/page";
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${page}`);
      const newArticles = response.data;

      setData([...data, ...newArticles.nodes]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Card data={data} loading={loading} />
    </div>
  );
};
export default InfiniteScrollView;
