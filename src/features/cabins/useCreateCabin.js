import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
import { capitalize } from "../../utils/helpers";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabinApi,
    onSuccess: () => {
      toast.success(`New Cabin Successfully Created`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(
        capitalize(
          `There was an error while creating cabin : \n${error.message}`,
        ),
      );
    },
  });

  return { isCreating, createCabin };
}
