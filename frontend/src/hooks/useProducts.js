import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";

const useProduct=(currentPage, searchTerm)=> {
    
    return useQuery({
        queryKey: ['products', currentPage, searchTerm],
        queryFn: ()=> fetchProducts({page:currentPage, searchTerm}),
        keepPreviousData: true,
    })
}
export default useProduct