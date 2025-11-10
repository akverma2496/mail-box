import { ToastContainer, Bounce } from "react-toastify"
import { Outlet } from "react-router"
import Header from "../components/Header"

const Layout = () => {
  return (
    <div>
      {/* <Header /> */}
      <Header />

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      
      <Outlet />
    </div>
  )
}

export default Layout