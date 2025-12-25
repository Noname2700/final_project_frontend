import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__info">
        <p className="footer__copyright">{`© ${new Date().getFullYear()}`}</p>
        <p className="footer__text">Supersite, Powered by News API</p>
      </div>
      <div className="footer__links">
        <Link to="/" className="footer__link-home">
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
          <FaGithub className="footer__icon" />
        </a>
        <a
          href="https://linkedin.com/in/yohan-encarnacion"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link-linkedin"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="footer__icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
