import React from "react";
import shrink  from "src/utils/shrink"
import Article from "src/views/common/card"

const SavedFeed = (saved, setSaved) => {
  const onDelete = (url: string) => {
    let newSaved = saved.filter((item) => {
      return item.url !== url;
    });
    setSaved(newSaved);
  };

  return (
    <>
      {saved.map((save) => (
        <Article
        url={save.url}
        multimedia={save.multimedia}
        headline={save.headline}
        by={save.by}
        date={save.date}
        abstract={shrink(save.abstract)}
        onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default SavedFeed;
