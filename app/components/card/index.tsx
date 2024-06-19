interface Props {
  title: string;
  imageSrc: string;
}

const Card: React.FC<Props> = ({ title, imageSrc }) => {
  return (
    <div>
      <img src={imageSrc} alt="" />
      <p>{title}</p>
    </div>
  );
};

export default Card;
