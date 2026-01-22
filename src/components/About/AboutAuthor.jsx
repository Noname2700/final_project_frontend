import "../About/AboutAuthor.css";
import avatar from "../../assets/images/avatar2.jpg";

function AboutAuthor() {
  return (
    <div className="about-author">
      <img src={avatar} alt="Author Portrait" className="about-author__image" />
      <div className="about-author__content">
        <h2 className="about-author__title">About The Author</h2>
        <p className="about-author__description">
          Hey there and welcome to my website! I'm Yohan Encarnacion, a
          passionate full-stack developer with a knack for creating dynamic and
          user-friendly web applications. With a strong desire to continue to
          grow as a full-stack developer with a solid foundation in both
          front-end and back-end technologies, I enjoy bringing ideas to life
          through code. When I'm not coding, you can find me working at a
          part-time job, exploring the latest tech trends, exercising at the
          gym, reading CS books, or indulging in gaming . I'm currently familiar
          with various programming languages like JavaScript, React, HTML5, and
          CSS3 and frameworks like Node.js, and Express. In the past year, my
          views have completely changed regarding technology, especially when I
          interact with the internet understanding just how much it takes for
          everything to work together. My awareness of how the internet
          functions and how we interact with it has grown tremendously, and I've
          come to appreciate the path former and current developers/engineers
          have created clearing up obstacles for us to be able to continue to
          grow and make things easier, smooth, and efficient for the world.
          They've really paved the way for new developers to create fast,
          smooth, adaptive, and efficient UIs that allows the world to operate
          on a daily basis. I'm hoping to continue this legacy and make a
          positive impact in the tech world, so let's connect and build
          something amazing together!
        </p>
      </div>
    </div>
  );
}
export default AboutAuthor;
