/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { loginUser, registerUser } from "../api/authApi"
import toast from "react-hot-toast"
import SvgLogo from "../assets/svg/logo"
import { loginSchema, schemaRegister } from "../schemas/schemaLogin"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: isLogin ? loginSchema : schemaRegister,
  })

  // Toggle between login and register forms
  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    reset()
  }

  // Handle form submission
  const onSubmit = async (data) => {
    if (isSubmitting) return; 

    try {
      if (isLogin) {
        await loginUser(data)
        toast.success("Login successful")
        navigate("/products", { replace: true })
      } else {
        const { confirmPassword, ...userData } = data
        await registerUser(userData)
        toast.success("با موفقیت ثبت نام انجام شد.")

        const loginSuccess = await loginUser(userData)
        if (loginSuccess) {
          navigate("/", { replace: true },
            setTimeout(() => {
              toast.success("لطفا وارد شوید.")
              
            }, 1500)
          )
        }
      }
    } catch (error) {
      toast.error(isLogin ? "کاربر یافت نشد" : "ثبت نام ناموفق")
    } 
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <h1 className="text-center mb-30 text-3xl font-extrabold font-vazirBold">بوت کمپ بوت استارت</h1>
      <div className="mt-8 sm:mx-auto sm:w-full  sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-4xl sm:px-10">
          <div className="flex justify-center items-center mb-4">
            <SvgLogo />
          </div>
          <div className="text-center font-semibold font-vazirBold mb-16">
            <span>
              فرم ثبت نام
            </span>
          </div>

          <form className="space-y-9" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                نام کاربری
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                {...register("username")}
                className="input"
              />
              {errors.username && <p className="errorMessage">{errors.username.message}</p>}
            </div>

            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              رمز عبور
            </label>

            <input
              id="password"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              {...register("password")}
              className="input"
            />
            {errors.password && <p className="errorMessage">{errors.password.message}</p>}

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  تکرار رمز عبور
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  className="input"
                />
                {errors.confirmPassword && (
                  <p className="errorMessage">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`registerBtn ${isSubmitting}: "opacity-50 cursor-not-allowed" : ""`} 
                
              >
                {isSubmitting  ? "در حال ورود ..." :  'ثبت نام' }
              </button>
            </div>
          </form>

          {/* Toggle Authentication */}
          <div
            onClick={toggleAuthMode}
            className="w-full mt-6 py-2 px-4 text-blue-500 text-sm font-medium cursor-pointer"
          >
            {isLogin ? "حساب جدید بسازید" : "حساب کاربری دارید؟"}
          </div>
        </div>
      </div>
    </div>
  )
}