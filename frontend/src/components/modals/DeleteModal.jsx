import CLoseSvgComponent from "../../assets/svg/close"

function DeleteModal ({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null
    
    return (
        <div className="fixed inset-0  backdrop-blur-xs bg-gray-300/30  flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-center m-6">
                    <div className="w-25 h-25 rounded-full bg-red-100 flex items-center justify-center">
                        <CLoseSvgComponent />
                    </div>
                </div>

                <h3 className="text-lg font-medium text-center mb-2">{title}</h3>
                <p className="text-sm text-gray-800 font-bold text-center mb-6">{message}</p>

                <div className="flex justify-center space-x-3">
                    <button
                        onClick={onConfirm}
                        className="w-[50%] px-4 py-2 bg-[#F43F5E] text-white rounded-md hover:bg-red-600 transition duration-200"
                    >
                        حذف
                    </button>
                    <button
                        onClick={onClose}
                        className=" w-[50%] px-4 py-2 bg-[#DFDFDF] text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
                    >
                        لغو
                    </button>

                </div>
            </div>
        </div>
    )
}

export default DeleteModal
