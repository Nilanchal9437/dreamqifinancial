import { cookies } from "next/headers";
import type { userType } from "@/components/MainLayout/types";

async function useUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("dreamqifinancial")?.value;

  const user: userType = userCookie
    ? safeJsonParse(userCookie)
    : { id: "", email: "", phone: 1111111111 };

  // Safe JSON parse function
  function safeJsonParse(value: string) {
    try {
      return JSON.parse(value);
    } catch {
      return { id: "", email: "", phone: 1111111111 };
    }
  }

  return user;
}

export default useUser;
