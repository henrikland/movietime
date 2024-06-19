import styles from "./card.module.css";

interface Props {
  title: string;
  subTitle?: string;
  score?: number;
  imageSrc: string;
}

const Card: React.FC<Props> = ({ title, subTitle, score, imageSrc }) => {
  return (
    <div className={styles.container}>
      {score !== undefined && (
        <div className={styles.score}>{`⭐ ${score.toFixed(2)}`}</div>
      )}
      <img className={styles.image} src={imageSrc} alt="" />
      <h3 className={styles.title}>{title}</h3>
      {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
    </div>
  );
};

export default Card;
