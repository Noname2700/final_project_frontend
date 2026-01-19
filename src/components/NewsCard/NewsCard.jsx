import "./NewsCard.css";

function NewsCard({
  article,
  keyword,
  savedArticles,
  isLoggedIn,
  setActiveModal,
  onSaveArticle,
  onDeleteArticle,
  showDelete = false,
}) {
  const isSaved = savedArticles.some((item) => item.url === article.url);

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

      <img
        src={article.urlToImage}
        alt={article.title}
        className="news-card__image"
      />

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

      <h3 className="news-card__title">{article.title}</h3>

      <p className="news-card__description">{article.description}</p>

      <p className="news-card__source">{article.source.name}</p>
    </article>
  );
}

export default NewsCard;
