import { useState, useContext } from "react";
import "./SavedArticles.css";
import NewsCards from "../NewsCards/NewsCards";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function SavedArticles({
  savedArticlesCount = [],
  savedArticles = [],
  keywords = [],
  onDeleteArticle,
  isLoggedIn,
  setActiveModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [showAllKeywords, setShowAllKeywords] = useState(false);

  const articleKeywords =
    keywords.length > 0
      ? keywords
      : [
          ...new Set(
            savedArticles.map((article) => article.keyword).filter(Boolean),
          ),
        ];

  const displayedKeywords = showAllKeywords
    ? articleKeywords
    : articleKeywords.slice(0, 3);
  const hasMoreKeywords = articleKeywords.length > 3;

  return (
    <div className="saved-articles__page">
      <h4 className="saved-articles__title">Saved articles</h4>
      <h2 className="saved-articles__subtitle">{`${
        currentUser?.name || "User"
      }, you have ${savedArticlesCount} saved article${
        savedArticlesCount !== 1 ? "s" : ""
      }`}</h2>
      {articleKeywords.length > 0 && (
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
                {showAllKeywords
                  ? "show less"
                  : `${articleKeywords.length - 3} more`}
              </button>
            </>
          )}
        </p>
      )}
      <section className=" saved-articles__section ">
        {savedArticles.length > 0 ? (
          <NewsCards
            articles={savedArticles}
            savedArticles={savedArticles}
            onDeleteArticle={onDeleteArticle}
            showDelete={true}
            isLoggedIn={isLoggedIn}
            setActiveModal={setActiveModal}
          />
        ) : (
          <div className="saved-articles__empty">
            <p className="saved-articles__empty-text">
              You haven't saved any articles yet. Start exploring and save
              articles that interest you!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
export default SavedArticles;
