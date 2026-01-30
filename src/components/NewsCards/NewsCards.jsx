import NewsCard from "../NewsCard/NewsCard";
import "./NewsCards.css";
import { useState } from "react";

function NewsCardList({
  articles,
  searchKeyword,
  onSaveArticle,
  savedArticles,
  onDeleteArticle,
  showDelete = false,
  isLoggedIn,
  setActiveModal,
}) {
  const [visibleCards, setVisibleCards] = useState(3);

  return (
    <div>
      <ul className="news-cards__list">
        {articles.slice(0, visibleCards).map((article, idx) => {
          const key = article._id || article.url || article.link || idx;
          return (
            <li key={key}>
              <NewsCard
                article={article}
                keyword={searchKeyword}
                onSaveArticle={onSaveArticle}
                savedArticles={savedArticles}
                onDeleteArticle={onDeleteArticle}
                showDelete={showDelete}
                isLoggedIn={isLoggedIn}
                setActiveModal={setActiveModal}
              />
            </li>
          );
        })}
      </ul>
      {visibleCards < articles.length && (
        <button
          className="news-cards__show-more-button"
          onClick={() => setVisibleCards(visibleCards + 3)}
        >
          Show more
        </button>
      )}
    </div>
  );
}
export default NewsCardList;
