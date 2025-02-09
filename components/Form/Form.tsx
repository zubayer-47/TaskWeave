import { ReactNode } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FormContext } from "./FormContext";

type FormProps<T extends FieldValues> = {
  schema: any;
  initialValues: any;
  children: ReactNode;
};

export const Form = ({ children }: FormProps) => {
  const form = useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <FormContext.Provider value={{ control: form.control }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormContext.Provider>
  );
};
