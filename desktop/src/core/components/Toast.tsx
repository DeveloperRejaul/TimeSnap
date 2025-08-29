import { Bounce, ToastContainer } from 'react-toastify'

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce} 
      aria-label={undefined}    
    />
  )
}
