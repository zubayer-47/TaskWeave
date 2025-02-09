import { ReactNode } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FormContext } from "./FormContext";

type FormProps<T extends FieldValues> = {
  schema: T; // change it later
  initialValues: T; // change it later
  children: ReactNode;
};

export const Form = <T extends FieldValues>({
  schema,
  initialValues,
  children,
}: FormProps<T>) => {
  const form = useForm<T>({
    defaultValues: initialValues,
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <FormContext.Provider value={{ control: form.control }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormContext.Provider>
  );
};
