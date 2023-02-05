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
  const { sendLetter } = useContext(LetterContext);
  const { register, handleSubmit, reset } = useForm<InputFormInputs>({
    resolver: zodResolver(InputLetterSchema),
  });

  function handleInputLetter(data: InputFormInputs) {
    sendLetter(data.letter);
    reset();
  }

  return (
    <InputFormContainer onSubmit={handleSubmit(handleInputLetter)}>
      <input
        type="text"
        {...register("letter")}
        placeholder="Digite uma letra"
      />
    </InputFormContainer>
  );
}
