import Axios from "@/lib/Axios";
import { toast } from "react-toastify";

const login = async (payload: { email: string; password: string }) => {
  try {
    const response = await Axios.post("/api/auth/login", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.data);

    if (response.status) {
      toast.success(response.message, { position: "top-right" });
      window.location.href = "/admin";
    } else {
      toast.warning(response.message, { position: "top-right" });
    }
  } catch (err: any) {
    console.error("error in login API ", err);
    toast.error(err?.response ? err?.response?.data?.message : err?.message, {
      position: "top-right",
    });
  }
};

export default login;
