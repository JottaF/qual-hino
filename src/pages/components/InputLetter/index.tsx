import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputFormContainer } from "./styles";
import { useContext } from "react";
import { LetterContext } from "../../../contexts/letterContext";

const InputLetterSchema = z.object({
  letter: z.string().max(1),
});

type InputFormInputs = z.infer<typeof InputLetterSchema>;

export function InputLetter() {
  const { sendLetter, clearHits, totalLetters, lettersFound } =
    useContext(LetterContext);

  const finishedLettersInput = false; //totalLetters - 12 <= lettersFound;

  console.log(totalLetters, lettersFound, totalLetters - 9 <= lettersFound);

  const { register, handleSubmit, reset } = useForm<InputFormInputs>({
    resolver: zodResolver(InputLetterSchema),
  });

  function handleInputLetter(data: InputFormInputs) {
    clearHits();
    sendLetter(data.letter.toLowerCase());
    reset();
  }

  return (
    <InputFormContainer onSubmit={handleSubmit(handleInputLetter)}>
      {/* todo: quando desabilitar o input, mudar-lo visualmente, incluindo o formato */}
      <input
        type="text"
        {...register("letter")}
        placeholder="Digite uma letra"
        autoComplete="off"
        disabled={finishedLettersInput}
      />
    </InputFormContainer>
  );
}
