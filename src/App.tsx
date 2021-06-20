import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ArticleFeed from "./views/feed";
import LogFeed from "./views/saved";
import NavBar from "./views/navbar";
import { getData, storeData } from "./utils/localstorage";
import API from "src/services/api"
import Anchor from "src/views/common/anchor"

toast.configure();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(getData("data") || []);

  const fetchArticles = async () => {
    const params = new URLSearchParams(window.location.search);
    const pageQueryParam: number = parseInt(params.get("page"));
    !pageQueryParam ? window.history.pushState({ page: 1 }, "?page=1") : setPage(pageQueryParam);
    setLoading(true);
    try {
      const list = await API.get(pageQueryParam);
      setList(list.data.response.docs);
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
        const list = await API.get(page);
        setList(list.data.response.docs);
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
  
  const loadingBar = () => {
    {loading ? (
      <div className="bar"/>
    ) : (
      null
    )}
  }

  return (
    <BrowserRouter>
      <NavBar
        view={view}
        setView={setView}
        page={page}
        fetchMore={fetchArticlesOnClick}
      />
      {loadingBar}
      <Anchor/>
      {error ? (
        <h4 className="text-center text-white">
          There was an error fetching the data, please try again later
        </h4>
      ) : (
        <div className="container">
          {!view ? (
            <div className="list_container">
              {ArticleFeed(list, saved, setSaved)}
            </div>
          ) : (
            <div className="log_container col-lg-6 offset-lg-3">
                {LogFeed(saved, setSaved)}
            </div>
          )}
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
