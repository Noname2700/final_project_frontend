import { Link } from "react-router-dom";
import githubIcon from "../../assets/icons/github.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import "./Footer.css";

function Footer() {
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__links">
        <Link to="/" className="footer__link-home" onClick={handleHomeClick}>
          Home
        </Link>
        <a
          href="https://tripleten.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link-tripleten"
        >
          TripleTen
        </a>
        <a
          href="https://github.com/Noname2700"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link-github"
          aria-label="GitHub"
        >
          <img src={githubIcon} alt="GitHub" className="footer__icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/yohan-encarnacion-55baa6301"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link-linkedin"
          aria-label="LinkedIn"
        >
          <img src={linkedinIcon} alt="LinkedIn" className="footer__icon" />
        </a>
      </div>
      <div className="footer__info">
        <p className="footer__copyright">{`© ${new Date().getFullYear()}`}</p>
        <p className="footer__text">Supersite, Powered by News API</p>
      </div>
    </footer>
  );
}

export default Footer;
