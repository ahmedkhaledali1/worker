import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function POST(req, { params }) {
  const { token } = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const request = await req.json();

  const headers = {
    Authorization: "Bearer " + token,
  };

  const { endpoint } = params;
  try {
    const { data } = await axios.post(
      `https://workerapp.space/public/api/auth/${endpoint}`,
      request,
      { headers }
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export async function GET(req, { params }) {
  const { token } = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const headers = {
    Authorization: "Bearer " + token,
  };

  const { endpoint } = params;
  try {
    const { data } = await axios.get(
      `https://workerapp.space/public/api/auth/${endpoint}`,
      { headers }
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
