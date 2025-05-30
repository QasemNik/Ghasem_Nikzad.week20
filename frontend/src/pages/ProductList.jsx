import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import useProducts from "../hooks/useProducts"
import ProductTable from "../components/productTable"
import ProductModal from "../components/modals/ProductModal"
import DeleteModal from "../components/modals/DeleteModal"
import Pagination from "../components/Pagination"
import SettingSvg from "../assets/svg/SettingSvg"
import { useDelete } from "../hooks/useDelete"
import SearchBar from "../components/SearchBox"
import Spinner from "../components/ui/Spinner"
import searchFilter from "../helper/searchFilter"

export default function ProductListPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const currentPage = parseInt(searchParams.get("page")) || 1

    // Fetch products
    const { data } = useProducts({ currentPage, searchTerm })

    const products = data?.data || []
    const totalPages = data?.totalPages || 1
    const filteredProducts = searchFilter(products, searchTerm)

    // Delete single
    const deleteMutation = useDelete()
    const confirmDelete = () => {
        if (productToDelete) {
            deleteMutation.mutate(productToDelete.id, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false)
                    setProductToDelete(null)
                }
            })
        }
    }

    const action = searchParams.get("action")
    const isProductModalOpen = action === "add" || (action === "edit" && selectedProduct)

    const handleAddProduct = () => {
        setSelectedProduct(null)
        setSearchParams({ action: "add" })
    }

    const handleEditProduct = (product) => {
        setSelectedProduct(product)
        setSearchParams({ action: "edit", id: product.id })
    }

    const handleDeleteClick = (product) => {
        setProductToDelete(product)
        setIsDeleteModalOpen(true)
    }

    const closeModal = () => {
        setSearchParams({})
        setSelectedProduct(null)
    }

    const handlePageChange = (page) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev)
            params.set("page", page.toString())
            return params
        })
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    <Spinner />
    return (
        <div className="p-6 overflow-hidden">
            <div className="">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className=" ">
                </div>
            </div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex justify-center items-center gap-4">
                    <SettingSvg className="inline-block" />
                    <h1 className="md:text-2xl text-xl text-center font-bold">مدیریت کالا</h1>
                </div>
                <button
                    onClick={handleAddProduct}
                    className="bg-[#55A3F0] text-white px-4 py-2 rounded-md hover:bg-[#55A3F8]/98 transition duration-200 cursor-pointer mt-10"
                >
                    افزودن محصول
                </button>
            </div>
            {filteredProducts && filteredProducts.length > 0 ? (
                <ProductTable
                    products={filteredProducts}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteClick}
                />
            ) : <div className="text-center py-10 text-gray-500 text-lg">
                {searchTerm ? (
                    <p>هیچ محصولی با عنوان "{searchTerm}" یافت نشد.</p>
                ) : (
                    <p>هیچ محصولی برای نمایش وجود ندارد.</p>
                )}
            </div>}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            <ProductModal
                isOpen={isProductModalOpen}
                onClose={closeModal}
                product={selectedProduct}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف محصول"
                message="آیا از حذف این محصول مطمئنید؟"
            />
        </div>
    )
}