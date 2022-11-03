import type { NextPage } from "next";
import { useState } from "react";
import { z } from "zod";
import _ from "lodash";

import Form from "@/components/common/Form/Form";
import TextInput from "@/components/common/TextInput/TextInput";
import Button from "@/components/common/Button/Button";
import FormLink from "@/components/common/FormLink/FormLink";

import { validateInput } from "utils/validateInput";
import { EMAIL_ERROR_MSG } from "@/constants/common/inputConstants";

const emailSchema = z.object({
  email: z.string().trim().email(),
});
type EmailSchema = z.infer<typeof emailSchema>;

const AdminForgotPassword: NextPage = () => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);

  const onInputChange = (inputName: string, value: string) => {
    setEmail(value);
  };

  const onFormSubmit = () => {
    const result = validateInput<EmailSchema, { email: string }>(
      emailSchema,
      { email }
    );

    setHasError(false);

    if (!result.data) {
      if (!_.isNil(result.errors.get('email'))) {
        setHasError(true);
        return;
      }
    }

    console.log(result.data);
  };

  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <p className="text-black-900 font-bold text-xl mb-4 tablet:text-2xl">
          Forgot your password
        </p>

        <p className="text-xs text-gray-900 mb-8 tablet:text-sm">
          Please enter your email to receive the link to reset your password.
        </p>

        <div className="text-sm mb-5 tablet:text-base">
          <TextInput
            id="email"
            inputType="email"
            labelText="email"
            errorText={EMAIL_ERROR_MSG}
            initialValue={email}
            onChange={onInputChange}
            hasError={hasError}
          />
        </div>

        <div className="flex flex-col text-sm mediumMobile:text-base tablet:text-lg">
          <Button>Send link</Button>
        </div>

        <div className="text-xs mt-9 tablet:text-sm">
          <span className="text-gray-900 inline-block mr-2">
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

export default AdminForgotPassword;
