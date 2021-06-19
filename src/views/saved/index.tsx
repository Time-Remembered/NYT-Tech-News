import moment from "moment";
import React from "react";

// Map log to cards
const LogFeed = (saved, setSaved) => {
  // Delete a save
  const onDelete = (url) => {
    let newSaved = saved.filter((item) => {
      return item.url !== url;
    });
    setSaved(newSaved);
  };

  return (
    <>
      {saved.map((saved) => (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <button
              // @ts-ignore
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
    </>
  );
};

export default LogFeed;
