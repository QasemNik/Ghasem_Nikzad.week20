import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addProduct, updateProduct } from "../../api/productApi"
import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { schemaProductModal } from "../../schemas/schemaProducts"

function ProductModal({ isOpen, onClose, product }) {
    const isEditMode = !!product
    const queryClient = useQueryClient()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schemaProductModal),
        defaultValues: {
            name: "",
            quantity: "",
            price: "",
        },
    })

    useEffect(() => {
        if (isEditMode && product) {
            reset({
                name: product.name,
                quantity: product.quantity,
                price: product.price,
            })
        } else {
            reset({
                name: "",
                quantity: "",
                price: "",
            })
        }
    }, [product, isEditMode, reset])

    const addMutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            toast.success("Product added successfully")
            reset()
            onClose()
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add product")
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
    })

    const updateMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
            toast.success("Product updated successfully")
            onClose()
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update product")
        },
        onSettled: () => {
            setIsSubmitting(false)
        },
    })

    const onSubmit = (data) => {
        setIsSubmitting(true)
        if (isEditMode) {
            updateMutation.mutate({ id: product.id, ...data })
        } else {
            addMutation.mutate(data)
        }
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-gray-300/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h2 className="text-xl font-bold mb-6 text-center">
                    {isEditMode ? "ویرایش اطلاعات" : "ایجاد محصول جدید"}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">نام کالا</label>
                        <input
                            placeholder="نام کالا"
                            type="text"
                            {...register("name")}
                            className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-gray-300 focus:bg-white"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">تعداد موجودی</label>
                        <input
                            placeholder="تعداد"
                            type="text"
                            {...register("quantity", { valueAsNumber: true })}
                            className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-gray-300 focus:bg-white"
                        />
                        {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">قیمت</label>
                        <input
                            placeholder="قیمت"
                            type="text"
                            {...register("price", { valueAsNumber: true })}
                            className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-gray-300 focus:bg-white"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    <div className="flex justify-center space-x-3 mt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 w-full bg-[#55A3F0] text-white rounded-md hover:bg-[#55A3F0]/90 transition duration-200 cursor-pointer outline-[#55A3F0]"
                        >
                            {isSubmitting
                                ? isEditMode
                                    ? "در حال بروزرسانی..."
                                    : "در حال ایجاد..."
                                : isEditMode
                                    ? "بروزرسانی"
                                    : "ایجاد"}
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 w-full bg-gray-200 text-gray-800 rounded-md hover:bg-gray-200/90 transition duration-200 cursor-pointer outline-gray-200"
                        >
                            انصراف
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductModal