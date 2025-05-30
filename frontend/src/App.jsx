import { Toaster } from "react-hot-toast"
import AppRoutes from "./routers/AppRouter"

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  )
}

export default App
