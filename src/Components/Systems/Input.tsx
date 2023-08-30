import { HTMLInputTypeAttribute } from "react";

export interface InputProps {
  type: HTMLInputTypeAttribute;
  value: string | number | undefined;
  placeholder: string;
  onChange: (value: string) => unknown;
}

export default function Input(props: InputProps) {
  return (
    <input
      type={props.type}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
    />
  );
}
