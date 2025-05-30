import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required("نام کاربری الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
  })
  .required()
 const loginSchema = yupResolver(schema)

  const registerSchema = yup.object({
    username: yup.string().required("نام کاربری الزامی است"),
    password: yup.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد").required("رمز عبور الزامی است"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "رمز عبور مطابقت ندارد")
      .required("تکرار رمز عبور الزامی است"),
  })
const schemaRegister = yupResolver(registerSchema)
    
export {loginSchema,schemaRegister
}