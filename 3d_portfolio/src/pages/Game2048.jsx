import React, { useState, useEffect, useCallback } from "react";
import {
  CornerUpLeft,
  RotateCcw,
  Trophy,
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const GRID_SIZE = 4;

const Game2048 = () => {
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Initialize empty board
  const initializeBoard = useCallback(() => {
    const newBoard = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    return newBoard;
  }, []);

  // Add random tile (2 or 4)
  const addRandomTile = (currentBoard) => {
    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (currentBoard[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { row, col } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  // Initialize game
  useEffect(() => {
    const savedBest = localStorage.getItem("2048-best-score");
    if (savedBest) setBestScore(parseInt(savedBest));
    setBoard(initializeBoard());
  }, [initializeBoard]);

  // Get tile color
  const getTileColor = (value) => {
    const colors = {
      0: "bg-gray-800/40",
      2: "bg-red-900/80",
      4: "bg-red-800/80",
      8: "bg-red-700",
      16: "bg-red-600",
      32: "bg-red-500",
      64: "bg-orange-600",
      128: "bg-orange-500",
      256: "bg-orange-400",
      512: "bg-yellow-600",
      1024: "bg-yellow-500",
      2048: "bg-yellow-400",
    };
    return colors[value] || "bg-purple-500";
  };

  // Move and merge tiles
  const moveTiles = (direction) => {
    if (gameOver) return;

    let moved = false;
    let newScore = score;
    const newBoard = board.map((row) => [...row]);

    const slideAndMerge = (arr) => {
      // Remove zeros
      let filtered = arr.filter((val) => val !== 0);

      // Merge tiles
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          newScore += filtered[i];
          filtered.splice(i + 1, 1);

          if (filtered[i] === 2048 && !won) {
            setWon(true);
          }
        }
      }

      // Pad with zeros
      while (filtered.length < GRID_SIZE) {
        filtered.push(0);
      }

      return filtered;
    };

    if (direction === "left") {
      for (let i = 0; i < GRID_SIZE; i++) {
        const oldRow = [...newBoard[i]];
        newBoard[i] = slideAndMerge(newBoard[i]);
        if (JSON.stringify(oldRow) !== JSON.stringify(newBoard[i]))
          moved = true;
      }
    } else if (direction === "right") {
      for (let i = 0; i < GRID_SIZE; i++) {
        const oldRow = [...newBoard[i]];
        const reversed = [...newBoard[i]].reverse();
        const slided = slideAndMerge(reversed);
        newBoard[i] = slided.reverse();
        if (JSON.stringify(oldRow) !== JSON.stringify(newBoard[i]))
          moved = true;
      }
    } else if (direction === "up") {
      for (let j = 0; j < GRID_SIZE; j++) {
        const column = newBoard.map((row) => row[j]);
        const oldColumn = [...column];
        const newColumn = slideAndMerge(column);
        for (let i = 0; i < GRID_SIZE; i++) {
          newBoard[i][j] = newColumn[i];
        }
        if (JSON.stringify(oldColumn) !== JSON.stringify(newColumn))
          moved = true;
      }
    } else if (direction === "down") {
      for (let j = 0; j < GRID_SIZE; j++) {
        const column = newBoard.map((row) => row[j]);
        const oldColumn = [...column];
        const reversed = [...column].reverse();
        const slided = slideAndMerge(reversed);
        const newColumn = slided.reverse();
        for (let i = 0; i < GRID_SIZE; i++) {
          newBoard[i][j] = newColumn[i];
        }
        if (JSON.stringify(oldColumn) !== JSON.stringify(newColumn))
          moved = true;
      }
    }

    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("2048-best-score", newScore.toString());
      }

      // Check game over
      if (isGameOver(newBoard)) {
        setGameOver(true);
      }
    }
  };

  // Check if game is over
  const isGameOver = (currentBoard) => {
    // Check for empty cells
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (currentBoard[i][j] === 0) return false;
      }
    }

    // Check for possible merges
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const current = currentBoard[i][j];
        if (
          (j < GRID_SIZE - 1 && current === currentBoard[i][j + 1]) ||
          (i < GRID_SIZE - 1 && current === currentBoard[i + 1][j])
        ) {
          return false;
        }
      }
    }

    return true;
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver || won) return;

      const key = e.key.toLowerCase();
      if (key === "arrowup" || key === "w") {
        e.preventDefault();
        moveTiles("up");
      } else if (key === "arrowdown" || key === "s") {
        e.preventDefault();
        moveTiles("down");
      } else if (key === "arrowleft" || key === "a") {
        e.preventDefault();
        moveTiles("left");
      } else if (key === "arrowright" || key === "d") {
        e.preventDefault();
        moveTiles("right");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  const resetGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const continueGame = () => {
    setWon(false);
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
        2048 Game{" "}
        <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
          🎯
        </span>
      </h2>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 shadow-lg transition-all duration-300"
          style={{ width: `${Math.min((score / 2048) * 100, 100)}%` }}
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
              <span className="text-xl font-bold">Best: {bestScore}</span>
            </div>
          </div>

          {/* Game Grid */}
          <div className="relative z-10 bg-gray-900/80 p-4 rounded-2xl border-2 border-red-600/50">
            <div className="grid grid-cols-4 gap-3">
              {board.map((row, i) =>
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold transition-all duration-200 ${getTileColor(
                      cell
                    )} ${
                      cell !== 0
                        ? "text-white shadow-lg scale-100"
                        : "text-transparent"
                    }`}
                    style={{
                      boxShadow:
                        cell !== 0 ? "0 0 20px rgba(220, 38, 38, 0.3)" : "none",
                    }}
                  >
                    {cell !== 0 ? cell : ""}
                  </div>
                ))
              )}
            </div>

            {/* Win Overlay */}
            {won && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center backdrop-blur-sm rounded-2xl">
                <div className="text-center">
                  <h3 className="text-5xl font-bold text-yellow-400 mb-4 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)] animate-pulse">
                    🎉 You Win! 🎉
                  </h3>
                  <p className="text-2xl text-white mb-6">You reached 2048!</p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={continueGame}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                    >
                      Continue
                    </button>
                    <button
                      onClick={resetGame}
                      className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
                    >
                      <RotateCcw className="w-5 h-5" />
                      New Game
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center backdrop-blur-sm rounded-2xl">
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
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="relative z-10 flex gap-4">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white rounded-lg font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
            >
              <RotateCcw className="w-5 h-5" /> New Game
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="relative z-10 grid grid-cols-3 gap-2 md:hidden">
            <div></div>
            <button
              onClick={() => moveTiles("up")}
              className="w-12 h-12 bg-black/80 hover:bg-red-600 border-2 border-red-500/50 rounded-lg flex items-center justify-center text-white transition-all"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
            <div></div>
            <button
              onClick={() => moveTiles("left")}
              className="w-12 h-12 bg-black/80 hover:bg-red-600 border-2 border-red-500/50 rounded-lg flex items-center justify-center text-white transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => moveTiles("down")}
              className="w-12 h-12 bg-black/80 hover:bg-red-600 border-2 border-red-500/50 rounded-lg flex items-center justify-center text-white transition-all"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
            <button
              onClick={() => moveTiles("right")}
              className="w-12 h-12 bg-black/80 hover:bg-red-600 border-2 border-red-500/50 rounded-lg flex items-center justify-center text-white transition-all"
            >
              <ArrowRight className="w-6 h-6" />
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
                <span className="text-white font-bold">WASD</span> to move tiles
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold">
                2
              </div>
              <p>
                When two tiles with the same number touch, they{" "}
                <span className="text-white font-bold">merge into one</span>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold">
                3
              </div>
              <p>
                Create a tile with the number{" "}
                <span className="text-yellow-400 font-bold">2048</span> to win!
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold">
                4
              </div>
              <p>Game ends when you can't make any more moves</p>
            </div>
          </div>

          <div className="relative z-10 mt-4 p-4 rounded-lg bg-red-600/10 border border-red-500/30">
            <h4 className="text-lg font-bold text-red-400 mb-2">
              🎯 Pro Tips:
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Keep your highest tile in a corner</li>
              <li>• Build tiles in a specific direction</li>
              <li>• Don't move randomly - plan ahead!</li>
              <li>• Focus on merging smaller tiles first</li>
            </ul>
          </div>

          <div className="relative z-10 p-4 rounded-lg bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/50">
            <h4 className="text-lg font-bold text-white mb-2">
              🏆 Tile Values:
            </h4>
            <div className="grid grid-cols-4 gap-2 text-xs text-white">
              <div className="bg-red-900 p-2 rounded text-center font-bold">
                2
              </div>
              <div className="bg-red-800 p-2 rounded text-center font-bold">
                4
              </div>
              <div className="bg-red-700 p-2 rounded text-center font-bold">
                8
              </div>
              <div className="bg-red-600 p-2 rounded text-center font-bold">
                16
              </div>
              <div className="bg-red-500 p-2 rounded text-center font-bold">
                32
              </div>
              <div className="bg-orange-600 p-2 rounded text-center font-bold">
                64
              </div>
              <div className="bg-orange-500 p-2 rounded text-center font-bold">
                128
              </div>
              <div className="bg-yellow-600 p-2 rounded text-center font-bold">
                256
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game2048;
