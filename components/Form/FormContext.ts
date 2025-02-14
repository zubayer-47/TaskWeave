import { createContext, useContext } from "react";
import { Control, FieldValues } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormContext<T extends FieldValues = any> = {
  control: Control<T>;
};

export const FormContext = createContext<FormContext | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFormContext = <T extends FieldValues = any>() => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a Form Provider");
  }

  return context.control as Control<T>;
};
