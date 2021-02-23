import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface FormFieldProps {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  id: string;
  placeholder?: string;
  onChange: (e: any) => void;
  error?: string;
}

const FormField = (props: FormFieldProps) => {
  return (
    <FormControl mb="3" isInvalid={!!props.error}>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder || props.label.toLowerCase()}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        required
      />
      <FormErrorMessage>
        <FormErrorIcon></FormErrorIcon>
        {props.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormField;
