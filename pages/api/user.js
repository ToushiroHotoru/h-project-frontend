import { NextApiRequest, NextApiResponse } from "next/server";
import axiosBack from "/libs/axiosBack";

export default async function ProfileApi(NextApiRequest, NextApiResponse) {
  try {
    const { headers, params } = NextApiRequest;
    const response = await axiosBack.get("/user", {
      headers,
      params: {
        username: params.username,
      },
    });

    const data = response.data;
    const returnedHeaders = response.headers;

    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1])
    );
    NextApiResponse.send(data);
  } catch (error) {
    NextApiResponse.send(error);
  }
}
