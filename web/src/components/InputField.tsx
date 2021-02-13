import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface InputFieldProps {
  label: string;
  type: "text" | "password" | "email";
  placeholder: string;
  value: string;
  id: string;
  onChange: (e: string) => void;
  required?: boolean;
  error?: string;
}

const InputField = (props: InputFieldProps) => {
  return (
    <FormControl
      my="3"
      isRequired={props.required || false}
      isInvalid={!!props.error}
    >
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        id={props.id}
        onChange={(e) => props.onChange(e.target.value)}
        required={props.required}
      />
      <FormErrorMessage>
        <FormErrorIcon></FormErrorIcon>
        {props.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
