import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { formatPrice } from "../helper/formatPrice";

export default function ProductTable({ products, onEdit, onDelete }) {
    return (
        <div className="bg-gray-100 rounded-lg shadow-md md:overflow-x-hidden overflow-x-scroll">
            <table className="min-w-full border-t-1 border-gray-300/60">
                <thead>
                    <tr>
                        <th className="tableHead">نام محصول</th>
                        <th className="tableHead">موجودی</th>
                        <th className="tableHead">قیمت</th>
                        <th className="tableHead">شناسه</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="tdElement">{product.name}</td>
                            <td className="tdElement">{product.quantity}</td>
                            <td className="tdElement">{formatPrice(product.price)}</td>
                            <td className="tdElement">{product.id.split("-").slice(3)}</td>
                            
                            <td className="tdElement">
                                <div className="flex gap-2">
                                    <button onClick={() => onEdit(product)} className="text-green-600 hover:text-green-700 cursor-pointer">
                                        <FaRegEdit className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => onDelete(product)} className="text-red-600 cursor-pointer hover:text-red-700">
                                        <IoTrashOutline className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
