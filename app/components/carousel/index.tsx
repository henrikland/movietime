import styles from "./carousel.module.css";

interface Props {
  children: React.ReactNode;
}

const Carousel: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Carousel;
