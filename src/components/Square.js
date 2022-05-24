function Square(props) {
  const { value, onClick, index, isGameOver } = props;

  function handleClick() {
    if (value || isGameOver) return;
    onClick(index);
  }

  return (
    <div className="square" onClick={handleClick}>
      {value}
    </div>
  );
}

export default Square;
