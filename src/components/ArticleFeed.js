import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import { shrink } from "../helpers/shrink";

// Map articles to cards
const ArticleFeed = (list, saved, setSaved) => {
  // Adding a new save
  const onSubmit = (url, multimedia, headline, by, date, abstract) => {
    if (saved.some((item) => item.url === url)) {
      toast.error("Your have already saved this article!");
    } else {
      let newSaved = [
        { url, multimedia, headline, by, date, abstract },
        ...saved,
      ];

      // Delete last item if array is over 10
      if (newSaved.length > 10) {
        newSaved = newSaved.slice(0, newSaved.length - 1);
      }

      setSaved(newSaved);

      toast.success("Article successfully saved");
    }
  };

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
                    ? process.env.REACT_APP_IMAGE + "/" + list.multimedia[0].url
                    : "https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png",
                  list.headline.main,
                  list.byline.original,
                  list.pub_date,
                  shrink(list.abstract)
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
                        {moment(list.pub_date).format("MMMM DD YYYY | h:mm A")}
                      </div>
                      <div className="text-muted">{shrink(list.abstract)}</div>
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

export default ArticleFeed;
