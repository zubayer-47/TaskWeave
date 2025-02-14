import { ReactNode } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FormContext } from "./FormContext";

type FormProps<T extends FieldValues> = {
  schema: T; // change it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any; // change it later
  children: ReactNode;
};

export const Form = <T extends FieldValues>({
  // schema,
  initialValues,
  children,
}: FormProps<T>) => {
  const form = useForm<T>({
    defaultValues: initialValues,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <FormContext.Provider value={{ control: form.control }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormContext.Provider>
  );
};
