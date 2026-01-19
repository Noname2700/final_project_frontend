import { useState } from "react";
import "./SavedArticles.css";
import NewsCards from "../NewsCards/NewsCards";

function SavedArticles({
  userData,
  savedArticlesCount = [],
  savedArticles = [],
  keywords = [],
  onDeleteArticle,
}) {
  const [showAllKeywords, setShowAllKeywords] = useState(false);

  const displayedKeywords = showAllKeywords ? keywords : keywords.slice(0, 3);
  const hasMoreKeywords = keywords.length > 3;

  return (
    <div className="saved-articles__page">
      <h4 className="saved-articles__title">Saved articles</h4>
      <h2 className="saved-articles__subtitle">{`${
        userData?.name || "User"
      }, you have ${savedArticlesCount} saved article${
        savedArticlesCount !== 1 ? "s" : ""
      }`}</h2>
      {keywords.length > 0 && (
        <p className="saved-articles__keywords">
          By keywords:{" "}
          {displayedKeywords.map((keyword, index) => (
            <span key={index}>
              <span className="saved-articles__keyword">{keyword}</span>
              {index < displayedKeywords.length - 1 && ", "}
            </span>
          ))}
          {hasMoreKeywords && (
            <>
              {!showAllKeywords && ", "}
              <button
                className="saved-articles__more-btn"
                onClick={() => setShowAllKeywords(!showAllKeywords)}
              >
                {showAllKeywords ? "show less" : `${keywords.length - 3} more`}
              </button>
            </>
          )}
        </p>
      )}
      <section className=" saved-articles__section ">
        <NewsCards
          articles={savedArticles}
          savedArticles={savedArticles}
          onDeleteArticle={onDeleteArticle}
          showDelete={true}
        />
      </section>
    </div>
  );
}
export default SavedArticles;
