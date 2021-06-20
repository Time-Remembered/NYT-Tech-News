import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ view, setView, page, fetchMore }): { view: boolean, setView: any, page: number, fetchMore: any } => {
  return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container px-sm-3">
          <div className="navbar-brand">Tech News</div>
          <ul className="nav navbar-nav mr-auto">
            {view ? (
              <li className="text-muted nav-link">10 Most Recent Saves</li>
            ) : page === 1 ? (
              <>
                <li className="text-muted nav-link">Previous</li>{" "}
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
                    {" "}
                    Next
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="nav navbar-nav ml-auto">
            {!view ? (
              <a
                className="nav-link pointer my-0"
                type="submit"
                href
                onClick={() => setView(true)}
              >
                <i className="fas fa-save" />
              </a>
            ) : (
              <a
                className="nav-link pointer"
                href
                onClick={() => setView(false)}
              >
                <i className="fas fa-chevron-left" />
              </a>
            )}
          </ul>
        </div>
      </nav>
  );
};

export default NavBar;
