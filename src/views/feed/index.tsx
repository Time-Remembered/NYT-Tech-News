import moment from "moment";
import React from "react";
import shrink from "src/utils/shrink";
import Article from "src/views/common/card"

const ArticleFeed = (list, saved, setSaved) => {
  const onSave = (url: string, multimedia: string, headline: string, by: string, date: string, abstract: string) => {
    if (saved.some((item) => item.url === url)) {
      return;
    };

    let newSaved: string[] = [
      { url, multimedia, headline, by, date, abstract },
      ...saved,
    ];
    if (newSaved.length > 10) {
      newSaved = newSaved.slice(0, newSaved.length - 1);
    };
    setSaved(newSaved);
  };

  return (
    <>
      {list.map((list) => (
        <Article
          url={list.web_url}
          multimedia={list.multimedia[0]
            ? process.env.REACT_APP_IMAGE + "/" + list.multimedia[0].url
            : "https://static01.nyt.com/vi-assets/images/share/1200x675_nameplate.png"}
          headline={list.headline.main}
          by={list.byline.original}
          date={moment(list.pub_date).format("MMMM DD YYYY | h:mm A")}
          abstract={shrink(list.abstract)}
          onSave={onSave}
        />
      ))}
    </>
  );
};

export default ArticleFeed;
