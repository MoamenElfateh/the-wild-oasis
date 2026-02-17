import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { capitalize } from "../../utils/helpers";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isPending: isCheckOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBookingApi(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({
        active: true,
      });
    },

    onError: (error) => {
      toast.error(
        capitalize(`There was an error while cheking out : \n${error.message}`),
      );
    },
  });

  return { checkOut, isCheckOut };
}
