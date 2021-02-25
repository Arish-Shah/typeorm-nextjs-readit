import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

interface FormFieldProps {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  id: string;
  placeholder?: string;
  onChange: (e: any) => void;
  error?: string;
  isTextarea?: boolean;
}

const FormField = (props: FormFieldProps) => {
  const Field: any = props.isTextarea ? Textarea : Input;

  return (
    <FormControl mb="3" isInvalid={!!props.error}>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Field
        type={props.type}
        id={props.id}
        placeholder={props.placeholder || props.label.toLowerCase()}
        value={props.value}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => props.onChange(e.target.value)}
        required
        rows="12"
      />
      <FormErrorMessage>
        <FormErrorIcon></FormErrorIcon>
        {props.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormField;
