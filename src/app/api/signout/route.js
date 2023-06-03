import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function DELETE(req) {
  const { token } = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const headers = {
    Authorization: "Bearer " + token,
  };
  try {
    const { data } = await axios.delete(
      "https://workerapp.space/public/api/auth/access-tokens",
      { headers }
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error.response);
  }
}
