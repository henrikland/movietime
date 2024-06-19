import styles from "./card.module.css";

interface Props {
  title: string;
  subTitle?: string;
  imageSrc: string;
}

const Card: React.FC<Props> = ({ title, subTitle, imageSrc }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageSrc} alt="" />
      <h3 className={styles.title}>{title}</h3>
      {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
    </div>
  );
};

export default Card;
