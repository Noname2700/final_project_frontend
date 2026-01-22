import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";

function Main({ onSearch }) {
  return (
    <main className="main">
      <h1 className="main__title">What's going on in the world?</h1>
      <p className="main__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm onSearch={onSearch} />
    </main>
  );
}

export default Main;
