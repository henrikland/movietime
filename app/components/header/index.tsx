import styles from "./header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>The Movie finder</h1>
      <nav className={styles.links}>
        <a href="/movies">Movies</a>
        <a href="/tvshows">TV Shows</a>
        <a href="/actors">Actors</a>
        <button>Sign In</button>
      </nav>
    </header>
  );
};

export default Header;
