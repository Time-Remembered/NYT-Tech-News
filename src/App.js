import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ArticleFeed from "./components/ArticleFeed";
import LogFeed from "./components/LogFeed";
import NavBar from "./components/Navbar";
import { getData, storeData } from "./helpers/localstorage";

toast.configure();

const App = () => {
  const [loading, setLoading] = useState(false);
  // Toggle between saved/feed
  const [view, setView] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const allSaved = () => getData("data") || [];
  const [saved, setSaved] = useState(allSaved);

  const fetchArticles = () => {
    // Get page url
    const params = new URLSearchParams(window.location.search);
    let pageQueryParam = parseInt(params.get("page"));
    if (!pageQueryParam) {
      window.history.pushState({ page: 1 }, "?page=1");
    } else {
      setPage(pageQueryParam);
    }
    setLoading(true);
    // Fetch Articles
    axios
      .get(
        `${process.env.REACT_APP_API}?q=${process.env.REACT_APP_QUERY}&page=${
          pageQueryParam ? pageQueryParam : 1
        }&api-key=${process.env.REACT_APP_KEY}`
      )
      .then((res) => {
        setList(res.data.response.docs);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  // Dispatched when previous or next buttons are clicked
  const fetchMoreArticles = (pg) => {
    setError(false);
    setPage(pg);
    setLoading(true);
    // Fetch Articles
    axios
      .get(
        `${process.env.REACT_APP_API}?q=${process.env.REACT_APP_QUERY}&page=${pg}&api-key=${process.env.REACT_APP_KEY}`
      )
      .then((res) => {
        setList(res.data.response.docs);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        window.scrollTo(0, 0);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    storeData("data", saved);
  }, [saved]);

  return (
    <BrowserRouter>
      <NavBar
        view={view}
        setView={setView}
        page={page}
        fetchMoreArticles={fetchMoreArticles}
      />
      {loading ? (
        <div className="bar">
          <div></div>
        </div>
      ) : (
        ""
      )}
      <div
        className="container"
        style={{
          marginTop: "60px",
        }}
      ></div>
      {error ? (
        <h4 className="text-center text-white">
          There was an error fetching the data, please try again later
        </h4>
      ) : (
        <div className="container">
          {view === false ? (
            <div className="list_container">
              {ArticleFeed(list, saved, setSaved)}
            </div>
          ) : (
            <div className="log_container">
              <div className="col-lg-6 offset-lg-3">
                {LogFeed(saved, setSaved)}
              </div>
            </div>
          )}
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
