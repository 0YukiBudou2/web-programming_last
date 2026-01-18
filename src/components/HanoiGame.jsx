import { useState,useEffect } from "react";
import "../../styles.css";

export default function HanoiGame({ initialDisks = 3 }) {
  const createInitialTowers = () => ([
    Array.from({ length: initialDisks }, (_, i) => initialDisks - i),
    [],
    []
  ]);
  const [towers, setTowers] = useState(
    createInitialTowers(initialDisks)
  );

  const [selectedTower, setSelectedTower] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isClear, setIsClear] = useState(false);
  const minMoves = Math.pow(2, initialDisks) - 1;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const initial = createInitialTowers();
    setTowers(initial);
    setHistory([initial.map(t => [...t])]);
    setSelectedTower(null);
    setMoveCount(0);
    setIsClear(false);
  }, [initialDisks]);

  const handleReset = () => {
    const initial = createInitialTowers(initialDisks);
    setTowers(initial);
    setHistory([initial.map(t => [...t])]);
    setSelectedTower(null);
    setMoveCount(0);
    setIsClear(false);
  };



  // 棒をクリックした時の処理
  const handleTowerClick = (index) => {
    if(isClear) return ;
    if (selectedTower === null) {
      // 1クリック目 → 選択
      if (towers[index].length === 0) return; // 空なら選択しない
      setSelectedTower(index);
    } else {
      // 2クリック目 → 移動処理
      if (selectedTower === index) {
        // 同じ塔を選んだらキャンセル
        setSelectedTower(null);
        return;
      }

      const from = towers[selectedTower];
      const to = towers[index];

      const disk = from[from.length - 1];

      // 移動可能条件：移動先が空 or 移動先の top より disk が小さい
      if (to.length === 0 || disk < to[to.length - 1]) {
        const newTowers = towers.map((t) => [...t]);
        newTowers[index].push(newTowers[selectedTower].pop());

        setHistory([...history, newTowers.map(t => [...t])]);
        setTowers(newTowers);
        setMoveCount(moveCount + 1);
        if (newTowers[2].length === initialDisks) {
            setIsClear(true);
          }
      }

      setSelectedTower(null);
    }
  };
  const handleUndo = () => {
    if (history.length <= 1) return;

    const newHistory = [...history];
    newHistory.pop(); // 最新状態を削除

    const previous = newHistory[newHistory.length - 1];

    setHistory(newHistory);
    setTowers(previous.map(t => [...t]));
    setMoveCount(moveCount - 1);
    setSelectedTower(null);
    setIsClear(false);
  };

  return (
    <div className="game-card">
      <p className="move-count">手数: {moveCount}</p>
      <button className="reset-button" onClick={handleReset}>
        リセット
      </button>
      <button
        className="undo-button"
        onClick={handleUndo}
        disabled={history.length <= 1}
      >
        1手戻る
      </button>
      {isClear && minMoves == moveCount && (
          <p className="clear-message">
            🎉 最小手クリア！ 手数:{moveCount}
            </p>
          )}
      {isClear && minMoves != moveCount &&(
        <div>
          <p className="clear-message">
            🎉 クリア！ 手数:{moveCount}
          </p>
          <p className = "clear-message2">
            最小手まで挑戦してみよう！
          </p>
        </div>          
        )}

      <div className="towers-container">
        {towers.map((tower, i) => (
          <div
            key={i}
            className={
              "tower" + (selectedTower === i ? " tower-selected" : "")
            }
            onClick={() => handleTowerClick(i)}
          >
            {tower.map((disk, j) => (
              <div
                key={j}
                className="disk"
                style={{ width: disk * 20 + "px" }}
              >
                {disk}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

}
