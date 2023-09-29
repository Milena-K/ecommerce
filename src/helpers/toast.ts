import { toast, ToastPosition } from "react-toastify"

type ToastProps = {
    message: string,
    position?: ToastPosition
}

export const showSuccessToast  = ({ message, position="bottom-right" }: ToastProps) => {
      return toast.success(message, {
          position,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
      });
}

export const showErrorToast  = ({ message, position="bottom-right" }: ToastProps) => {
      return toast.error(message, {
          position,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
      });
}
