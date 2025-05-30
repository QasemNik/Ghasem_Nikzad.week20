import * as yup from "yup"

export const schemaProductModal = yup.object({
    id: yup.string(),
    name: yup.string().required("نام محصول الزامی است"),
    quantity: yup
        .number()
        .typeError("مقدار موجودی باید عدد باشد")
        .integer("Quantity must be an integer")
        .min(0, "Quantity cannot be negative")
        .required("مقدار موجودی الزامی است"),
    price: yup
        .number()
        .typeError("مقدار باید عدد وارد شود")
        .positive("Price must be positive")
        .required("قیمت الزامی است"),
})
