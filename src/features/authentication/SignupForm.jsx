import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import Spinner from "../../ui/Spinner";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signUp, isSignUp } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signUp(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  }

  if (isSignUp) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow labelName="Full name" error={errors?.fullName?.message}>
        <Input
          id="fullName"
          type="text"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow labelName="Email address" error={errors?.email?.message}>
        <Input
          id="email"
          type="email"
          disabled={isSignUp}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        labelName="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          id="password"
          type="password"
          disabled={isSignUp}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        labelName="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          id="passwordConfirm"
          type="password"
          disabled={isSignUp}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || `Password needs to match`,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          disabled={isSignUp}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isSignUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
