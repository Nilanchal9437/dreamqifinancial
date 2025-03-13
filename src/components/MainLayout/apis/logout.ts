import axios from "axios";
import { toast } from "react-toastify";

const logout = async () => {
  try {
    const response = await axios
      .get("/api/auth/logout")
      .then((res) => res.data);

    if (response.status) {
      toast.success(response.message, { position: "top-right" });
      window.location.href = "/";
    } else {
      toast.warning(response.message, { position: "top-right" });
    }
  } catch (err: any) {
    console.error("error in logout API ", err?.message);
    toast.error(err?.message, { position: "top-right" });
  }
};

export default logout;
