import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import AppRoute from "./routes/AppRoute"

function App() {
  return (
    <>
      <AppRoute />
      <ToastContainer position="top-right" autoClose={2500} theme="dark" />
    </>
  )
}

export default App
