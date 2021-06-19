import React from "react";
import moment from "moment";

const projectCard = ({ list, saved, setSaved,  }) => {
    const onDelete = (url) => {
        let newSaved = saved.filter((item) => {
          return item.url !== url;
        });
        setSaved(newSaved);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <button
                        // @ts-ignore
                            onClick={onDelete.bind(this, url)}
                            className="overlay btn btn-dark btn-lg fas fa-trash"
                        ></button>
                        <a
                            href={list.url}
                            className="p-0"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div
                                className="project-card card border-0 bg-dark"
                                style={{
                                    backgroundImage: `url(${list.multimedia})`,
                                }}
                            >
                                <div className="project-card-content card-body">
                                    <div className="project-text">
                                        <h4 className="bold">{list.headline}</h4>
                                        <div className="text-muted">{list.by}</div>
                                        <div className="text-muted">
                                            {" "}
                                            {moment(list.date).format("MMMM DD YYYY | h:mm A")}
                                        </div>
                                        <div className="text-muted">{list.abstract}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
export default projectCard;
