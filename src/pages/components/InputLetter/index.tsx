import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputFormContainer } from "./styles";

const InputLetterSchema = z.object({
  letter: z.string().max(1),
});

type InputFormInputs = z.infer<typeof InputLetterSchema>;

export function InputLetter() {
  const { register, handleSubmit, reset } = useForm<InputFormInputs>({
    resolver: zodResolver(InputLetterSchema),
  });

  function handleInputLetter(data: InputFormInputs) {
    console.log(data.letter);
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
