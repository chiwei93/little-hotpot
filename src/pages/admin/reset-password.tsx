import type { NextPage } from "next";
import { useState } from "react";
import { z } from "zod";
import _ from "lodash";

import Form from "@/components/common/Form/Form";
import TextInput from "@/components/common/TextInput/TextInput";
import Button from "@/components/common/Button/Button";
import FormLink from "@/components/common/FormLink/FormLink";

import {
  CONFIRM_PASSWORD_ERROR_MSG,
  MIN_PASSWORD_CHARACTERS,
  PASSWORD_ERROR_MSG,
} from "@/constants/common/inputConstants";
import { validateInput } from "utils/validateInput";

const inputsSchema = z
  .object({
    password: z.string().trim().min(MIN_PASSWORD_CHARACTERS),
    confirmPassword: z.string().trim(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords provided don't match",
    path: ["confirmPassword"],
  });
type InputsSchema = z.infer<typeof inputsSchema>;

const AdminResetPassword: NextPage = () => {
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    password: false,
    confirmPassword: false,
  });

  const onInputChange = (inputName: string, value: string) => {
    setFormValues((prevForm) => {
      return { ...prevForm, [inputName]: value };
    });
  };

  const clearFormErrors = () => {
    setFormErrors({
      password: false,
      confirmPassword: false,
    });
  };

  const onFormSubmit = () => {
    const result = validateInput<InputsSchema, typeof formValues>(
      inputsSchema,
      formValues
    );

    clearFormErrors();

    if (!result.data) {
      result.errors.forEach((err, key) => {
        setFormErrors((prevValues) => {
          return { ...prevValues, [key]: true };
        });
      });
      return;
    }

    console.log(result.data);
  };

  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <p className="mb-8 text-xl font-bold text-black-900 tablet:text-2xl">
          Reset your password
        </p>

        <div className="mb-4 text-sm tablet:text-base">
          <TextInput
            id="password"
            labelText="new password"
            inputType="password"
            hasError={formErrors.password}
            errorText={PASSWORD_ERROR_MSG}
            initialValue={formValues.password}
            onChange={onInputChange}
          />
        </div>

        <div className="text-sm tablet:text-base">
          <TextInput
            id="confirmPassword"
            labelText="confirm new password"
            inputType="password"
            hasError={formErrors.confirmPassword}
            errorText={CONFIRM_PASSWORD_ERROR_MSG}
            initialValue={formValues.confirmPassword}
            onChange={onInputChange}
          />
        </div>

        <div className="mt-8 flex flex-col text-sm largeMobile:mt-10 largeMobile:text-base tablet:text-lg">
          <Button onClick={() => _.noop()}>Reset password</Button>
        </div>

        <div className="mt-14 text-xs tablet:text-sm">
          <span className="mr-2 inline-block text-gray-900">
            Already have an account?
          </span>
          <span>
            <FormLink href="/admin" fontSize="1em">
              Log in
            </FormLink>
          </span>
        </div>
      </Form>
    </>
  );
};

export default AdminResetPassword;
