import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import spinner from "./img/spinner.gif";
import { getData, storeData } from "./middleware/localstorage";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";

toast.configure();

const App = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [view, setView] = useState(false);

  const fetchArticles = () => {
    setError(false);
    // Get page url
    const params = new URLSearchParams(window.location.search);
    let pageQueryParam = parseInt(params.get("page"));
    if (!pageQueryParam) {
      window.history.pushState({ page: 1 }, "?page=1");
    }
    if (pageQueryParam) {
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

  // When app renders dispatch fetchArticles
  useEffect(() => {
    fetchArticles();
  }, []);

  // Map articles to cards
  const ArticleFeed = () => {
    return (
      <React.Fragment>
        {list.map((list) => (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <button
                  onClick={onSubmit.bind(
                    this,
                    list.web_url,
                    list.multimedia[0]
                      ? process.env.REACT_APP_IMAGE +
                          "/" +
                          list.multimedia[0].url
                      : "https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png",
                    list.headline.main,
                    list.byline.original,
                    list.pub_date,
                    list.abstract
                  )}
                  className="overlay btn btn-dark btn-lg fas fa-star"
                ></button>
                <a
                  href={list.web_url}
                  className="p-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="project-card card border-0 bg-dark"
                    style={{
                      backgroundImage: `url(${
                        list.multimedia[0]
                          ? process.env.REACT_APP_IMAGE +
                            "/" +
                            list.multimedia[0].url
                          : "https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png"
                      })`,
                    }}
                  >
                    <div className="project-card-content card-body">
                      <div className="project-text">
                        <h4 className="bold">{list.headline.main}</h4>
                        <div className="text-muted">{list.byline.original}</div>
                        <div className="text-muted">
                          {" "}
                          {moment(list.pub_date).format(
                            "MMMM DD YYYY | h:mm A"
                          )}
                        </div>
                        <div className="text-muted">{list.abstract}</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  };

  const allSaved = () => getData("data") || [];
  const [saved, setSaved] = useState(allSaved);

  // Initialize data from local storage
  useEffect(() => {
    storeData("data", saved);
  }, [saved]);

  // Delete a save
  const onDelete = (url) => {
    let newSaved = saved.filter((item) => {
      return item.url !== url;
    });
    setSaved(newSaved);
  };

  // Adding a new save
  const onSubmit = (url, multimedia, headline, by, date, abstract) => {
    // console.log("url:" + url);
    // console.log("multimedia:" + multimedia);
    // console.log("headline:" + headline);
    // console.log("by:" + by);
    // console.log("date:" + date);
    // console.log("abstract:" + abstract);

    if (saved.some((item) => item.url === url)) {
      toast.error("Your have already saved this article!");
      return;
    } else {
      let newSaved = [
        { url, multimedia, headline, by, date, abstract },
        ...saved,
      ];
      if (newSaved.length > 10) {
        newSaved = newSaved.slice(0, newSaved.length - 1);
      }
      setSaved(newSaved);

      toast.success("Article successfully saved");
    }
  };

  // Map log to cards
  const LogFeed = () => {
    return (
      <React.Fragment>
        {saved.map((saved) => (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <button
                  onClick={onDelete.bind(this, saved.url)}
                  className="overlay btn btn-dark btn-lg fas fa-trash"
                ></button>
                <a
                  href={saved.url}
                  className="p-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="project-card card border-0 bg-dark"
                    style={{
                      backgroundImage: `url(${saved.multimedia})`,
                    }}
                  >
                    <div className="project-card-content card-body">
                      <div className="project-text">
                        <h4 className="bold">{saved.headline}</h4>
                        <div className="text-muted">{saved.by}</div>
                        <div className="text-muted">
                          {" "}
                          {moment(saved.date).format("MMMM DD YYYY | h:mm A")}
                        </div>
                        <div className="text-muted">{saved.abstract}</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  };

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark ">
        <div className="container px-sm-3">
          <div className="navbar-brand">Tech News</div>
          <ul className="nav navbar-nav mr-auto">
            {view === true ? (
              <li className="text-muted nav-link">10 Most Recent Saves</li>
            ) : page === 1 ? (
              <>
                <li className="text-muted nav-link">Previous</li>{" "}
                <li>
                  <Link
                    className="nav-link"
                    onClick={() => fetchMoreArticles(page + 1)}
                    to={`?page=${page + 1}`}
                  >
                    {" "}
                    Next
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="nav-link"
                    onClick={() => fetchMoreArticles(page - 1)}
                    to={`?page=${page - 1}`}
                  >
                    {" "}
                    Previous
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link"
                    onClick={() => fetchMoreArticles(page + 1)}
                    to={`?page=${page + 1}`}
                  >
                    {" "}
                    Next
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="nav navbar-nav ml-auto">
            {loading ? (
              <span className="navbar-text mr-2">
                <div>
                  <img
                    src={spinner}
                    style={{ width: "22px", margin: "auto", display: "block" }}
                    alt="Loading..."
                  />
                </div>
              </span>
            ) : (
              ""
            )}
            {view === false ? (
              <a
                className="nav-link pointer"
                type="submit"
                onClick={() => setView(true)}
              >
                <i className="fas fa-save" />
              </a>
            ) : (
              <a className="nav-link pointer" onClick={() => setView(false)}>
                <i className="fas fa-chevron-left" />
              </a>
            )}
          </ul>
        </div>
      </nav>
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
        <div>
          <div className="container">
            {view === false ? (
              <div className="list_container">{ArticleFeed()}</div>
            ) : (
              <div className="log_container">
                <div className="col-lg-6 offset-lg-3">{LogFeed()}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
