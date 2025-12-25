import "./AboutAuthor.css";
import avatar from "../../assets/avatar.jpg";

function AboutAuthor() {
  return (
    <div className="about-author">
      <img src={avatar} alt="Author Portrait" className="about-author__image" />
      <div className="about-author__content">
        <h2 className="about-author__title">About the Author</h2>
        <p className="about-author__description">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know. You
          can also talk about your experience with TripleTen, what you learned
          there, and how you can help potential customers.
        </p>
      </div>
    </div>
  );
}
export default AboutAuthor;
