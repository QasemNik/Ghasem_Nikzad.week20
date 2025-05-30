import useAuth from '../../hooks/useAuth'
import useProduct from '../../hooks/useProducts'

export default function Spinner() {
    const { isLoading } = useAuth()
    const {  isFetching } = useProduct()
    if (isLoading || isFetching) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        )
    }
 
}
