import "./ArticlesSection.css";
import NewsCards from "../NewsCards/NewsCards";
import Preloader from "../Preloader/Preloader";
import notFoundImage from "../../assets/images/notfoundv1.svg";

function ArticlesSection({
  articles,
  isLoadingArticles,
  searchError,
  searchKeyword,
  onSaveArticle,
  savedArticles,
  searchExecuted,
  isLoggedIn,
  setActiveModal,
}) {
  return (
    <>
      {searchExecuted && (
        <div className="articles-section">
          <h1 className="articles-section__title">Search Results</h1>
          {isLoadingArticles && <Preloader disabled={isLoadingArticles} />}

          {searchError && (
            <p className="article-section__error">{searchError}</p>
          )}

          {articles.length > 0 && !isLoadingArticles && (
            <NewsCards
              articles={articles}
              searchKeyword={searchKeyword}
              onSaveArticle={onSaveArticle}
              savedArticles={savedArticles}
              showDelete={false}
              isLoggedIn={isLoggedIn}
              setActiveModal={setActiveModal}
            />
          )}

          {!isLoadingArticles && articles.length === 0 && searchKeyword && (
            <div className="article-section__no-results">
              <img
                src={notFoundImage}
                alt="Search Not Found"
                className="article-section__notfoundimage"
              />
              <h1 className="article-section__no-results-title">
                Nothing found
              </h1>
              <p className="article-section__no-results-text">
                Sorry, but nothing matched your search terms.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ArticlesSection;
