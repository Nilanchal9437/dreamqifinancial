import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest): Promise<unknown> {
  const url = request?.nextUrl?.pathname;

  const token: any = request.cookies.get("dreamqifinancial");
  const user: any = request.cookies.get("user")?.value
    ? JSON.parse(`${request.cookies.get("user")?.value || ""}`)
    : null;

  const AUTH_URL: string = `${process.env.DREAMQI_APP_BASE_URL}/login`;

  const routeCondition = Boolean(
    token?.value &&
      user &&
      (url === "/login" ||
        url === "/signup" ||
        url === "/forget-password" ||
        url === "/")
  );

  if (
    (!token?.value || !user) &&
    url.includes("/admin") &&
    !url.includes("/api")
  ) {
    const response = NextResponse.redirect(AUTH_URL);

    response.cookies.delete("dreamqifinancial");
    response.cookies.delete("user");

    return response;
  } else {
    if (
      url !== "/" &&
      !url.includes("/login") &&
      !url.includes("/api/login") &&
      !url.includes("/api/signup") &&
      !url.includes("/api/forget-password")
    ) {
      const verifys: any = await jwtVerify(
        token?.value,
        new TextEncoder().encode(`${process.env.JWT_SECRET}`)
      );

      if (
        verifys?.payload?.id &&
        user?.role &&
        user?.id === verifys?.payload?.id
      ) {
        if (url.includes("/admin")) {
          return NextResponse.redirect(
            `${process.env.OFFICER_APP_BASE_URL}/admin`
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
    } else if (routeCondition) {
      return NextResponse.redirect(`${process.env.OFFICER_APP_BASE_URL}/admin`);
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/admin", "/admin/:path*"],
};
