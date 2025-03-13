import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest): Promise<unknown> {
  const url = request?.nextUrl?.pathname;

  const token: any = request.cookies.get("dreamqifinancial");

  const AUTH_URL: string = `${process.env.DREAMQI_APP_BASE_URL}/login`;

  if (!token?.value && url !== "/login" && url !== "/") {
    return NextResponse.redirect(AUTH_URL);
  } else {
    if (!url.includes("/login") && url !== "/") {
      const verifys: any = await jwtVerify(
        token?.value,
        new TextEncoder().encode(`${process.env.JWT_SECRET}`)
      );

      const user: any = JSON.parse(request.cookies.get("user")?.value || "");

      if (
        verifys?.payload?.email &&
        user?.email &&
        user?.email === verifys?.payload?.email
      ) {
        if (url === "/login") {
          return NextResponse.redirect(
            `${process.env.DREAMQI_APP_BASE_URL}/admin`
          );
        } else {
          return NextResponse.next();
        }
      } else {
        const response = NextResponse.redirect(AUTH_URL);

        response.cookies.delete("dreamqifinancial");
        response.cookies.delete("user");

        return response;
      }
    }
  }
}

export const config = {
  matcher: ["/login", "/admin", "/admin/:path*"],
};
