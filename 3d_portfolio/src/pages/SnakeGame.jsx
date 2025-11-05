import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  CornerUpLeft,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Zap,
} from "lucide-react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const directionRef = useRef(direction);
  const gameLoopRef = useRef(null);

  // Generate random food position
  const generateFood = useCallback((currentSnake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );
    return newFood;
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      const key = e.key.toLowerCase();
      const currentDir = directionRef.current;

      if ((key === "arrowup" || key === "w") && currentDir.y === 0) {
        directionRef.current = { x: 0, y: -1 };
        if (isPaused) setIsPaused(false);
      } else if ((key === "arrowdown" || key === "s") && currentDir.y === 0) {
        directionRef.current = { x: 0, y: 1 };
        if (isPaused) setIsPaused(false);
      } else if ((key === "arrowleft" || key === "a") && currentDir.x === 0) {
        directionRef.current = { x: -1, y: 0 };
        if (isPaused) setIsPaused(false);
      } else if ((key === "arrowright" || key === "d") && currentDir.x === 0) {
        directionRef.current = { x: 1, y: 0 };
        if (isPaused) setIsPaused(false);
      } else if (key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameOver, isPaused]);

  // Game loop
  useEffect(() => {
    if (isPaused || gameOver) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      return;
    }

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (
          prevSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => {
            const newScore = prev + 10;
            if (newScore > highScore) setHighScore(newScore);
            return newScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPaused, gameOver, food, generateFood, highScore]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setIsPaused(true);
    setScore(0);
  };

  return (
    <section className="relative flex w-full h-screen overflow-hidden items-center justify-center bg-gradient-to-br from-black via-red-950 to-black">
      {/* Home Button */}
      <button
        type="button"
        onClick={() => (window.location.href = "/")}
        aria-label="Go to Home"
        className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center justify-center text-white p-2 rounded-md border-2 border-red-500 bg-black/70 shadow-sm shadow-red-600/30 transition-all duration-200 hover:bg-red-900 hover:shadow-md hover:scale-105 cursor-pointer"
      >
        <CornerUpLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Title */}
      <h2 className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-40 text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]">
        Snake Game{" "}
        <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
          🐍
        </span>
      </h2>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 shadow-lg transition-all duration-300"
          style={{ width: `${Math.min((score / 200) * 100, 100)}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center gap-8 px-8 md:px-16">
        {/* Game Board */}
        <div className="relative flex flex-col items-center gap-6 p-8 rounded-[30px] border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 pointer-events-none rounded-[30px]"></div>

          {/* Score Display */}
          <div className="relative z-10 flex gap-8 text-white">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-500" />
              <span className="text-xl font-bold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-xl font-bold">Best: {highScore}</span>
            </div>
          </div>

          {/* Game Canvas */}
          <div
            className="relative z-10 border-2 border-red-600/50 bg-black/80 rounded-lg"
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
            }}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: GRID_SIZE }).map((_, y) =>
                Array.from({ length: GRID_SIZE }).map((_, x) => (
                  <div
                    key={`${x}-${y}`}
                    className="absolute border border-red-900/20"
                    style={{
                      left: x * CELL_SIZE,
                      top: y * CELL_SIZE,
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                    }}
                  />
                ))
              )}
            </div>

            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className="absolute rounded-sm transition-all duration-75"
                style={{
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  backgroundColor: index === 0 ? "#dc2626" : "#ef4444",
                  boxShadow:
                    index === 0 ? "0 0 10px rgba(220, 38, 38, 0.8)" : "none",
                }}
              />
            ))}

            {/* Food */}
            <div
              className="absolute rounded-full animate-pulse"
              style={{
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
                backgroundColor: "#facc15",
                boxShadow: "0 0 15px rgba(250, 204, 21, 0.8)",
              }}
            />

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-red-500 mb-4 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
                    Game Over!
                  </h3>
                  <p className="text-2xl text-white mb-6">
                    Final Score: {score}
                  </p>
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Play Again
                  </button>
                </div>
              </div>
            )}

            {/* Pause Overlay */}
            {isPaused && !gameOver && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <Play className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                  <p className="text-xl text-white font-bold">
                    Press any arrow key to start
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="relative z-10 flex gap-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              disabled={gameOver}
              className="flex items-center gap-2 px-6 py-3 bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-500/50"
            >
              {isPaused ? (
                <>
                  <Play className="w-5 h-5" /> Start
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5" /> Pause
                </>
              )}
            </button>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white rounded-lg font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
            >
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="hidden lg:flex flex-col gap-6 p-8 rounded-[30px] border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.4)] max-w-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 pointer-events-none rounded-[30px]"></div>

          <h3 className="relative z-10 text-2xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]">
            How to Play 🎮
          </h3>

          <div className="relative z-10 space-y-4 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold">
                1
              </div>
              <p>
                Use <span className="text-white font-bold">Arrow Keys</span> or{" "}
                <span className="text-white font-bold">WASD</span> to control
                the snake
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold">
                2
              </div>
              <p>
                Eat the{" "}
                <span className="text-yellow-400 font-bold">yellow food</span>{" "}
                to grow longer and score points
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold">
                3
              </div>
              <p>
                Avoid hitting the{" "}
                <span className="text-white font-bold">walls</span> or your own{" "}
                <span className="text-white font-bold">body</span>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold">
                4
              </div>
              <p>
                Press <span className="text-white font-bold">Space</span> to
                pause/resume the game
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-4 p-4 rounded-lg bg-red-600/10 border border-red-500/30">
            <h4 className="text-lg font-bold text-red-400 mb-2">
              🎯 Pro Tips:
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Plan your moves ahead</li>
              <li>• Use the edges strategically</li>
              <li>• Stay calm as you grow longer</li>
              <li>• Each food = 10 points!</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SnakeGame;
