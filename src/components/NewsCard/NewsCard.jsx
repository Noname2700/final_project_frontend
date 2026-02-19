import "./NewsCard.css";
import { useState } from "react";

function NewsCard({
  article,
  savedArticles,
  isLoggedIn,
  setActiveModal,
  onSaveArticle,
  onDeleteArticle,
  showDelete = false,
}) {
  const articleUrl = article.url || article.link;
  const isSaved = savedArticles.some(
    (item) => item.url === articleUrl || item.link === articleUrl,
  );
  const [imageError, setImageError] = useState(false);

  const handleDeleteArticle = () => {
    const articleIdToDelete = article._id || article.url || article.link;
    console.log("🗑️ NewsCard delete clicked for article:", article);
    console.log("🔍 Using ID for deletion:", articleIdToDelete);
    if (onDeleteArticle) {
      onDeleteArticle(articleIdToDelete);
    }
  };

  const handleSaveArticle = () => {
    if (isLoggedIn && isSaved) {
      onDeleteArticle(article._id || article.url || article.link);
    } else if (isLoggedIn) {
      onSaveArticle(article);
    } else {
      setActiveModal("register");
    }
  };

  const [showHoverMessage, setShowHoverMessage] = useState(false);

  return (
    <article className="news-card">
      {showDelete && article.keyword && (
        <span className="news-card__keyword">{article.keyword}</span>
      )}

      <a
        href={article.url || article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__link"
      >
        {article.urlToImage && !imageError ? (
          <img
            src={article.urlToImage || article.imageUrl}
            alt={article.title}
            className="news-card__image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="news-card__image news-card__image-placeholder">
            <span className="news-card__image-placeholder-text">
              No Image Available
            </span>
          </div>
        )}
      </a>

      {showDelete && (
        <button
          className="news-card__delete-button"
          onClick={handleDeleteArticle}
          aria-label="Delete article"
        ></button>
      )}

      {!showDelete && (
        <>
          <button
            className={
              isSaved
                ? "news-card__save-button_clicked"
                : "news-card__save-button"
            }
            onClick={handleSaveArticle}
            disabled={!isLoggedIn}
            aria-label={isSaved ? "Article saved" : "Save article"}
            onMouseEnter={() => {
              if (!isLoggedIn) setShowHoverMessage(true);
            }}
            onMouseLeave={() => setShowHoverMessage(false)}
          />

          {!isLoggedIn && showHoverMessage && (
            <span
              className="news-card__save-hover-message"
              onClick={(e) => {
                e.stopPropagation();
                setActiveModal && setActiveModal("register");
              }}
            >
              Sign up to save articles
              <br />
              <span className="news-card__save-hover-link">
                Click here to register
              </span>
            </span>
          )}
        </>
      )}

      <p className="news-card__date">
        {new Date(article.publishedAt).toLocaleDateString("default", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <a
        href={article.url || article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__title-link"
      >
        <h3 className="news-card__title">{article.title}</h3>
      </a>

      <p className="news-card__description">{article.description}</p>

      <p className="news-card__source">{article.source.name}</p>
    </article>
  );
}

export default NewsCard;
