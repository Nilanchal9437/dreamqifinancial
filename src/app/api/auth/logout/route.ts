import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const response = NextResponse.json(
    {
      status: true,
      message: "logout successfully",
    },
    { status: 200 }
  );

  response.cookies.delete("dreamqifinancial");
  response.cookies.delete("user");

  return response;
}
