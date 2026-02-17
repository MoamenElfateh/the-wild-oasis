import toast from "react-hot-toast";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { capitalize } from "../../utils/helpers";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success(`Cabin Successfully Updated`);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(
        capitalize(
          `There was an error while updating cabin : \n${error.message}`,
        ),
      );
    },
  });

  return { isUpdating, updateCabin };
}
