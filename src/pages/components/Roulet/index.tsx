import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { LetterContext } from "../../../contexts/letterContext";
import { RouletteContainer, Spin, RouletteImg } from "./styles";

const imgRoulette = "../../../../src/assets/roulette.png";
const imgSpin = "../../../../src/assets/Spin.png";

export function Roulette() {
  const rotate = useContextSelector(LetterContext, (context) => context.rotate);

  return (
    <RouletteContainer>
      <RouletteImg src={imgRoulette} rotate={rotate} />
      <Spin src={imgSpin} />
    </RouletteContainer>
  );
}
