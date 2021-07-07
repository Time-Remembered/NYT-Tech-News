import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import API from "src/services/api";
import Anchor from "src/views/common/anchor";
import "./App.css";
import { getData, storeData } from "./utils/localstorage";
import ArticleFeed from "./views/feed";
import NavBar from "./views/navbar";
import SavedFeed from "./views/saved";

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [articles, setArticles] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [saved, setSaved] = useState<[]>(getData("data") || []);

  const fetchArticles = async () => {
    const params = new URLSearchParams(window.location.search);
    const pageQueryParam: number = parseInt(params.get("page"));
    !pageQueryParam ? window.history.pushState({ page: 1 }, "?page=1") : setPage(pageQueryParam);
    setLoading(true);
    try {
      const articles = await API.get(pageQueryParam);
      setArticles(articles.data.response.docs);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticlesOnClick = async (page: number) => {
    setError(false);
    setPage(page);
    setLoading(true);
    try {
      const articles = await API.get(page);
      setArticles(articles.data.response.docs);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    storeData("data", saved);
  }, [saved]);

  const renderLoadingBar = () => {
    return (
      loading ? (
        <div className="bar"/>
      ) : (
        null
      )
    );
  };

  const renderArticles = () => {
    if (error) {
      return (
        <h4 className="text-center text-white">
        There was an error fetching the data, please try again later
      </h4>
      );
    };

    return (
      <div className="container">
      <div className="deck">
        {view ? (
          SavedFeed(saved, setSaved)
        ) : (
          ArticleFeed(articles, saved, setSaved)
        )}
      </div>
    </div>
    )
  };

  return (
    <BrowserRouter>
      <NavBar
        view={view}
        setView={setView}
        page={page}
        fetchMore={fetchArticlesOnClick}
      />
      {renderLoadingBar()}
      <Anchor />
      {renderArticles()}
    </BrowserRouter>
  );
};

export default App;
