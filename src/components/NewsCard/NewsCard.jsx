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
  const isSaved = savedArticles.some((item) => item.url === article.url);
  const [imageError, setImageError] = useState(false);

  const handleDeleteArticle = () => {
    if (onDeleteArticle) {
      onDeleteArticle(article.url);
    }
  };

  const handleSaveArticle = () => {
    if (isLoggedIn) {
      onSaveArticle(article);
    } else {
      setActiveModal("login");
    }
  };

  return (
    <article className="news-card">
      {showDelete && article.keyword && (
        <span className="news-card__keyword">{article.keyword}</span>
      )}

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="news-card__link"
      >
        {article.urlToImage && !imageError ? (
          <img
            src={article.urlToImage}
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
        <button
          className={
            isSaved
              ? "news-card__save-button_clicked"
              : "news-card__save-button"
          }
          onClick={handleSaveArticle}
          disabled={!isLoggedIn}
          aria-label={isSaved ? "Article saved" : "Save article"}
        ></button>
      )}

      <p className="news-card__date">
        {new Date(article.publishedAt).toLocaleDateString("default", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <a
        href={article.url}
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
