import "./Main.css";

function Main() {
  return (
    <main className="main">
      <h1>What's going on in the world?</h1>
      <p>
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <div className="main__search">
        <input
          type="text"
          placeholder="Enter topic"
          className="main__search-input"
        />
        <button className="main__search-button">Search</button>
      </div>
    </main>
  );
}

export default Main;
