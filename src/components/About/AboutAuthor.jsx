import "../About/AboutAuthor.css";
import avatar from "../../assets/images/avatar2.jpg";

function AboutAuthor() {
  return (
    <div className="about-author">
      <img src={avatar} alt="Author Portrait" className="about-author__image" />
      <div className="about-author__content">
        <h2 className="about-author__title">About The Author</h2>
        <p className="about-author__description">
          Hey there — welcome to my website! Im Yohan Encarnacion, a passionate
          full-stack developer dedicated to building dynamic, user-friendly web
          applications. I'm driven by a genuine desire to grow as a developer
          and strengthen my foundation across both front-end and back-end
          technologies. I love bringing ideas to life through clean, thoughtful
          code. When Im not coding, you'll usually find me working at my
          part-time job, exploring new tech trends, hitting the gym, reading
          computer science books, or enjoying some gaming. Im currently familiar
          with JavaScript, HTML5, CSS3, and frameworks like React, Node.js, and
          Express. Over the past year, my entire perspective on technology has
          undergone a significant transformation. Understanding how the internet
          works behind the scenes — and how much engineering goes into making
          everyday interactions seamless — has given me a deep appreciation for
          the developers and engineers who paved the way. Their work allows us
          to build faster, smoother, and more adaptive user experiences that
          power the world every day. Im excited to continue that legacy and make
          a positive impact in the tech world. Let's connect and build something
          amazing together.
        </p>
      </div>
    </div>
  );
}
export default AboutAuthor;
