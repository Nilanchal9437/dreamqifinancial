import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import * as yup from "yup";
import Chat from "@/models/Chat";

export async function PUT(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const res = await Chat.create({
      answer: body?.answer,
      created_at: new Date(),
    });

    if (res) {
      return NextResponse.json(
        {
          status: true,
          message: "Chat submitted successfully",
          data: res,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          status: false,
          message: "something went wrong in creating chat",
          data: res,
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error("Error in generating chat :::", err?.message);
    return NextResponse.json(
      {
        status: false,
        message: "something went wrong in generating chat",
        data: null,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const limit: any = req.nextUrl.searchParams.get("limit");
    const pageNo: any = req.nextUrl.searchParams.get("pageNo");

    const startingAfter: number = (parseInt(pageNo) - 1) * parseInt(limit);

    const res = await Chat.aggregate([
      {
        $facet: {
          result: [
            { $sort: { _id: -1 } },
            { $skip: startingAfter },
            { $limit: parseInt(limit) },
          ],
          total: [{ $count: "total" }],
        },
      },
    ]);

    if (res && Array.isArray(res) && res.length > 0) {
      const response = res[0]?.result;
      const total = res[0]?.total[0]?.total;

      return NextResponse.json(
        {
          status: true,
          message: "Chat fetched successfully",
          data: response,
          total: total,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: false,
          message: "something went wrong fetching Chat",
          data: [],
          total: 0,
        },
        { status: 303 }
      );
    }
  } catch (err: any) {
    console.error("Error in getting Chat :::", err?.message);
    return NextResponse.json(
      {
        status: false,
        message: "something went wrong getting Chat",
        data: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const entrie = req.nextUrl.searchParams.get("_id");

    const schema = yup.object().shape({
      _id: yup.string().trim().required("Chat id is missing!"),
    });

    return schema
      .validate({ _id: entrie })
      .then(async () => {
        const res = await Chat.deleteOne({ _id: `${entrie}` });

        if (res?.acknowledged) {
          return NextResponse.json(
            {
              status: true,
              message: "Chat deleted successfully",
              data: res,
            },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            {
              status: false,
              message: "something went wrong Chat",
              data: res,
            },
            { status: 400 }
          );
        }
      })
      .catch((err) => {
        if (err.errors != null && err.errors.length > 0) {
          return NextResponse.json(
            {
              status: false,
              message: "something went error occour Chat",
              data: err.errors[0],
            },
            { status: 400 }
          );
        } else {
          return NextResponse.json(
            {
              status: false,
              message: "something went error occour",
              data: err.message,
            },
            { status: 400 }
          );
        }
      });
  } catch (err: any) {
    console.error("Error in deleted Chat :::", err?.message);
    return NextResponse.json(
      {
        status: false,
        message: "something went wrong deleted Chat",
        data: err.message,
      },
      { status: 500 }
    );
  }
}
