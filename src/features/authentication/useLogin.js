import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { capitalize } from "../../utils/helpers";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: ({ user }) => {
      // set some date into React-Query cache, after user success login
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], user);
      toast.success(capitalize("logged in"));
    },
    onError: (error) => {
      toast.error(
        capitalize(
          `provided email or password are incorrect : \n${error.message}`,
        ),
      );
    },
  });
  return { login, isLogin };
}
