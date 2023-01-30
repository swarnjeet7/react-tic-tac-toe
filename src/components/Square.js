function Square({ value, onClick, index }) {
  const handleClick = () => {
    onClick(index);
  };

  return (
    <div className="square" onClick={handleClick}>
      {value}
    </div>
  );
}

export default Square;
