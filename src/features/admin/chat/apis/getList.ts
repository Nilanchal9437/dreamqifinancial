import Axios from "@/lib/Axios";
import type { ChatType } from "@/features/admin/chat/types";

const getList = async (
  payload: any
): Promise<{ status: boolean; data: ChatType[]; total: number }> => {
  try {
    const response = await Axios.get("/api/chat", {
      params: payload,
    }).then((res) => res.data);

    if (Array.isArray(response?.data)) {
      if (response) {
        return { status: true, data: response?.data, total: response?.total };
      } else {
        return { status: false, data: [], total: 0 };
      }
    } else {
      return { status: false, data: [], total: 0 };
    }
  } catch (err: any) {
    console.log("error in getting chat list fetching :: ", err);
    return { status: false, data: [], total: 0 };
  }
};

export default getList;
