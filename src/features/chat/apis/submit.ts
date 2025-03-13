import Axios from "@/lib/Axios";
import { toast } from "react-toastify";

const create = async (
  payload: { [key: string | number]: string | number }[]
) => {
  try {
    const response = await Axios.put("/api/chat", {
      answer: payload,
    }).then((res) => res.data);

    if (response?.status) {
      toast.success(response.message, { position: "top-right" });
    } else {
      toast.warning(response.message, { position: "top-right" });
    }
  } catch (err: any) {
    console.log("error in submitting chat :: ", err);
    toast.error(err?.response ? err?.response?.data?.message : err?.message, {
      position: "top-right",
    });
  }
};

export default create;
