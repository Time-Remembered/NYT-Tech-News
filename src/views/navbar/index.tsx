import React from "react";
import { Link } from "react-router-dom";

interface Nav {
  view: boolean;
  setView: any;
  page: number;
  fetchMore: any;
}

const NavBar = ({ view, setView, page, fetchMore }): Nav => {
  const renderNavigation = () => {
    if (view) {
      return (<li className="text-muted nav-link">10 Most Recent Saves</li>);
    };

    return (
      page === 1 ? (
        <>
          <li className="text-muted nav-link">Previous</li>
          <li>
            <Link
              className="nav-link"
              onClick={() => fetchMore(page + 1)}
              to={`?page=${page + 1}`}
            >
              Next
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              className="nav-link"
              onClick={() => fetchMore(page - 1)}
              to={`?page=${page - 1}`}
            >
              Previous
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              onClick={() => fetchMore(page + 1)}
              to={`?page=${page + 1}`}
            >
              Next
            </Link>
          </li>
        </>
      )
    );
  };

  const renderSave = () => {
    return (
      view ? (
        <a
          className="nav-link pointer"
          href
          onClick={() => setView(false)}
        >
          <i className="fas fa-chevron-left" />
        </a>
      ) : (
        <a
          className="nav-link pointer my-0"
          type="submit"
          href
          onClick={() => setView(true)}
        >
          <i className="fas fa-save" />
        </a>
      )
    );
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container px-sm-3">
        <div className="navbar-brand">Tech News</div>
        <ul className="nav navbar-nav mr-auto">
          {renderNavigation()}
        </ul>
        <ul className="nav navbar-nav ml-auto">
          {renderSave()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
