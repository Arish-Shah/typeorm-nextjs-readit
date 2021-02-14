import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

interface InputFieldProps {
  label: string;
  type: "text" | "password" | "email";
  placeholder: string;
  error?: string | undefined;
  value: string;
  onChange: (val: any) => void;
  textarea?: boolean;
}

const InputField = (props: InputFieldProps) => {
  let InputOrTextarea: any = Input;

  if (props.textarea) {
    InputOrTextarea = Textarea;
  }

  return (
    <FormControl isInvalid={!!props.error} my="3">
      <FormLabel>{props.label}</FormLabel>
      <InputOrTextarea
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e: any) => props.onChange(e.target.value)}
      />
      <FormErrorMessage>
        <FormErrorIcon></FormErrorIcon>
        {props.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
