import { useState } from "react";
import "../styles.css";
import HanoiGame from "./components/HanoiGame";


export default function App() {
  const [diskCount, setDiskCount] = useState(3);
  return (
    <div className="container">
      <h1>ハノイの塔</h1>
      <div>
        <p className="description">
          ハノイの塔は、異なる大きさの円盤を左から右へ移動させるパズルです。
          
        </p>
        <p>
          一度に動かせるのは1枚だけで、大きい円盤の上に小さい円盤を置けません。
        </p>
      </div>
      <div className="difficulty-buttons">
        <button  className = {diskCount == 3 ? "difficulty active" : "difficulty"}
        onClick={() => setDiskCount(3)}>Easy</button>
        <button className = {diskCount == 4 ? "difficulty active" : "difficulty"}
        onClick={() => setDiskCount(4)}>Normal</button>
        <button className = {diskCount == 5 ? "difficulty active" : "difficulty"}
        onClick={() => setDiskCount(5)}>Hard</button>
      </div>

      <HanoiGame initialDisks={diskCount} />
    </div>
  );
}
