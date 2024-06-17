import styles from "./header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>The Movie finder</h1>
      <nav className={styles.links}>
        <a href="/movies">Movies</a>
        <a href="/tvshows">TV Shows</a>
        <a href="/actors">Actors</a>
      </nav>
    </header>
  );
};

export default Header;
