import {toast} from "react-toastify";


const useToast = (msg, status = null) => {

    if(!status) {
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined

        });

    } else if(status === "error") {
        toast.error(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined

        })

    }

}

export default useToast;



