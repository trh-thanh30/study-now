import toast from 'react-hot-toast';
export const useToast = () => {
  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  const showErrorToast = (message: string) => {
    toast.error(message);
  };
  const showLoadingToast = (message: string, promise: Promise<any>) => {
    toast.promise(promise, {
      loading: message,
      success: 'Operation successful!',
      error: 'Operation failed!',
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
    showLoadingToast,
  };
};
