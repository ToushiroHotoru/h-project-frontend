/* eslint-disable import/no-anonymous-default-export */
// import { NextApiRequest, NextApiResponse } from "next/server";
import axiosBack from "../../libs/axiosBack";

export default async (NextApiRequest, NextApiResponse) => {
  const res = NextApiResponse;
  try {
    const { headers, query } = NextApiRequest;
    const response = await axiosBack.get("/user", {
      headers,
      params: {
        username: query.username,
      },
    });

    const data = response.data;
    const returnedHeaders = response.headers;

    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1])
    );
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
