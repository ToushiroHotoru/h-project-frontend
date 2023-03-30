import axiosBack from "@libs/axiosBack";
import { NextApiRequest, NextApiResponse } from "next/server";

export default async function ProfileLogout(NextApiRequest, NextApiResponse) {
  const { headers } = req;

  try {
    const response = await axiosBack.delete("/logout", {
      headers,
    });
    const data = response.data;
    const returnedHeaders = response.headers;

    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1])
    );

    res.send(data);
  } catch ({ response: { status, data } }) {
    res.status(status).json(data);
  }
}
