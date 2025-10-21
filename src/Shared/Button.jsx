const Button = ({ bg, name }) => {
  return (
    <div>
      <span className={`${bg} p-4`}>{name}</span>
    </div>
  );
};

export default Button;
