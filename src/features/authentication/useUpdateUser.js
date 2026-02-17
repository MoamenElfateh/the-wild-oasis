import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { capitalize } from "../../utils/helpers";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUserApi,
    onSuccess: ({ user }) => {
      toast.success(`User Account Successfully Updated`);
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      toast.error(
        capitalize(
          `There was an error while updating user : \n${error.message}`,
        ),
      );
    },
  });

  return { isUpdating, updateUser };
}
