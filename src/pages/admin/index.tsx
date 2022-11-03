import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { z } from "zod";
import _ from "lodash";

import Form from "@/components/common/Form/Form";
import TextInput from "@/components/common/TextInput/TextInput";
import Button from "@/components/common/Button/Button";
import Checkbox from "@/components/common/Checkbox/Checkbox";
import FormLink from "@/components/common/FormLink/FormLink";

import { validateInput } from "utils/validateInput";
import {
  EMAIL_ERROR_MSG,
  MIN_PASSWORD_CHARACTERS,
  PASSWORD_ERROR_MSG,
} from "@/constants/common/inputConstants";

const rememberMeString = "adminRememberMe";
const inputsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(MIN_PASSWORD_CHARACTERS),
});

type InputsSchema = z.infer<typeof inputsSchema>;

const AdminLogin: NextPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberMeFromLocalStorage = localStorage.getItem(rememberMeString);

    if (!_.isNil(rememberMeFromLocalStorage)) {
      setRememberMe(JSON.parse(rememberMeFromLocalStorage));
    } else {
      setRememberMe(false);
    }
  }, []);

  const onInputChange = (inputName: string, value: string) => {
    setFormValues((prevFormValues) => {
      return { ...prevFormValues, [inputName]: value };
    });
  };

  const onCheckboxChange = (inputName: string, value: boolean) => {
    setRememberMe(value);
    localStorage.setItem(rememberMeString, JSON.stringify(value));
  };

  const clearFormErrors = () => {
    setFormErrors({
      email: false,
      password: false,
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
    console.log(rememberMe);
  };

  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <p className="text-black-900 font-bold text-xl mb-4 tablet:text-2xl">
          Log in
        </p>

        <p className="text-xs text-gray-900 mb-8 tablet:text-sm">
          Welcome to the admin portal of little hotpot
        </p>

        <div className="text-sm mb-4 tablet:text-base">
          <TextInput
            id="email"
            labelText="email"
            inputType="email"
            initialValue={formValues.email}
            onChange={onInputChange}
            hasError={formErrors.email}
            errorText={EMAIL_ERROR_MSG}
          />
        </div>

        <div className="text-sm mb-4 tablet:text-base">
          <TextInput
            id="password"
            labelText="password"
            inputType="password"
            initialValue={formValues.password}
            onChange={onInputChange}
            hasError={formErrors.password}
            errorText={PASSWORD_ERROR_MSG}
          />
        </div>

        <div className="text-xs grid grid-cols-2 items-center gap-2 mediumMobile:text-sm tablet:text-base">
          <div className="justify-self-start">
            <Checkbox
              id="rememberMe"
              initialValue={rememberMe}
              labelText="Remember me"
              onChange={onCheckboxChange}
            />
          </div>

          <div className="justify-self-end">
            <FormLink href="/admin/forgot-password">
              Forgot your password?
            </FormLink>
          </div>
        </div>

        <div className="mt-10 flex flex-col tablet:text-lg tablet:mt-12">
          <Button>Log in</Button>
        </div>
      </Form>
    </>
  );
};

export default AdminLogin;
