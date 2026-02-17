import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { capitalize } from "../../utils/helpers";

export function useSignup() {
  const { mutate: signUp, isPending: isSignUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        capitalize(
          `account successfully created! \n plaese verify the new account from user's email address`,
        ),
      );
    },
  });

  return { signUp, isSignUp };
}
