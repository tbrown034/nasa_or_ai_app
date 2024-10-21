const GameMessage = ({ resultMessage, isCorrect }) => {
  return (
    <div
      className={`text-2xl font-bold ${
        isCorrect ? "text-green-500" : "text-red-500"
      }`}
    >
      {resultMessage}
    </div>
  );
};

export default GameMessage;
