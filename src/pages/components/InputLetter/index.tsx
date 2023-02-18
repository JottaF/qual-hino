import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputFormContainer } from "./styles";
import { useContextSelector } from "use-context-selector";
import { LetterContext } from "../../../contexts/letterContext";

const InputLetterSchema = z.object({
  letter: z.string().max(1),
});

type InputFormInputs = z.infer<typeof InputLetterSchema>;

export function InputLetter() {
  const {
    sendLetter,
    finishedLettersInput,
    roulettePoints,
    handleRoulette,
    showLetters,
  } = useContextSelector(LetterContext, (context) => {
    return context;
  });

  const { register, handleSubmit, reset } = useForm<InputFormInputs>({
    resolver: zodResolver(InputLetterSchema),
  });

  function handleInputLetter(data: InputFormInputs) {
    console.log("inputLetter 25 ", data.letter);

    sendLetter(data.letter.toLowerCase());
    reset();
  }

  function showAllLetters() {
    showLetters();
  }

  return (
    <InputFormContainer onSubmit={handleSubmit(handleInputLetter)}>
      {/* todo: quando desabilitar o input, mudar-lo visualmente, incluindo o formato */}
      {roulettePoints > 0 && !finishedLettersInput && (
        <input
          type="text"
          {...register("letter")}
          placeholder="Digite uma letra"
          autoComplete="off"
          autoFocus
        />
      )}

      {true && (
        <button type="button" onClick={showAllLetters}>
          Revelar
        </button>
      )}

      {(roulettePoints === 0 || finishedLettersInput) && (
        <button type="button" onClick={handleRoulette} autoFocus>
          Girar roleta
        </button>
      )}
    </InputFormContainer>
  );
}
