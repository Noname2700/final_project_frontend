import "./Preloader.css";

function Preloader({ message = "Searching for news..." }) {
  return (
    <div className="preloader">
      <div className="circle-preloader"></div>
      <div className="text-preloader">{message}</div>
    </div>
  );
}
export default Preloader;
