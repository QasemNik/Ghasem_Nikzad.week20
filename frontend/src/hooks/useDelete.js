import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/productApi";
import toast from "react-hot-toast";

export function useDelete() {
    const client = useQueryClient()
    return useMutation({
        mutationFn: deleteProduct, 
        onSuccess: () => {
            client.invalidateQueries({queryKey:["products"]})
            toast.success("با موفقیت حذف شد")
        },
        onError:()=> toast.error("حذف ناموفق")
    })
}