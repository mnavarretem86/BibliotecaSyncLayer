import { toast } from 'react-toastify';

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const notify = {
  success: (msg) => toast.success(msg, toastConfig),
  error: (msg) => toast.error(msg, toastConfig),
  info: (msg) => toast.info(msg, toastConfig),
  warning: (msg) => toast.warning(msg, toastConfig),
};