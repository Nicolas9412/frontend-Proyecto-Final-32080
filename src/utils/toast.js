import toast from "react-hot-toast";

const success = (message) => {
  toast.success(message);
};

const error = (message) => {
  toast.error(message);
};

export { error, success };
