import { useContext, useState } from "react";
import { LetterContext } from "../../../contexts/letterContext";
import { Container, Spin, RouletteImg } from "./styles";

const imgRoulette = "../../../../src/assets/roulette.png";
const imgSpin = "../../../../src/assets/Spin.png";

export function Roulette() {
  const [rotate, setRotate] = useState(0);
  const { sendRoulettePoint } = useContext(LetterContext);

  function handleRoulette() {
    const rotation = Math.random() * 5000 + 6000;
    setRotate((state) => rotation);

    const deg = rotation % 360;
    if (deg >= 0 && deg < 20) {
      sendRoulettePoint(200);
    } else if (deg >= 20 && deg < 40) {
      sendRoulettePoint(100);
    } else if (deg >= 40 && deg < 60) {
      sendRoulettePoint(350);
    } else if (deg >= 60 && deg < 80) {
      sendRoulettePoint(1);
    } else if (deg >= 80 && deg < 100) {
      sendRoulettePoint(800);
    } else if (deg >= 100 && deg < 120) {
      sendRoulettePoint(75);
    } else if (deg >= 120 && deg < 140) {
      sendRoulettePoint(900);
    } else if (deg >= 140 && deg < 160) {
      sendRoulettePoint(1);
    } else if (deg >= 160 && deg < 180) {
      sendRoulettePoint(100);
    } else if (deg >= 180 && deg < 200) {
      sendRoulettePoint(750);
    } else if (deg >= 200 && deg < 220) {
      sendRoulettePoint(50);
    } else if (deg >= 220 && deg < 240) {
      sendRoulettePoint(1);
    } else if (deg >= 240 && deg < 260) {
      sendRoulettePoint(150);
    } else if (deg >= 260 && deg < 280) {
      sendRoulettePoint(600);
    } else if (deg >= 280 && deg < 300) {
      sendRoulettePoint(250);
    } else if (deg >= 300 && deg < 320) {
      sendRoulettePoint(0);
    } else if (deg >= 320 && deg < 340) {
      sendRoulettePoint(1000);
    } else if (deg >= 340 && deg < 360) {
      sendRoulettePoint(1);
    }
  }
  return (
    <Container>
      <RouletteImg src={imgRoulette} rotate={rotate} onClick={handleRoulette} />
      <Spin src={imgSpin} />
    </Container>
  );
}
