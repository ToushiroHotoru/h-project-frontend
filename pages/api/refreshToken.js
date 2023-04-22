/* eslint-disable import/no-anonymous-default-export */
import axios from "../../libs/axiosBack";
import { NextApiRequest, NextApiResponse } from "next/server";

export default async (NextApiRequest, NextApiResponse) => {
  const res = NextApiResponse;
  try {
    const { headers } = NextApiRequest;

    const response = await axios.get("/refresh", { headers });

    const data = response.data;
    const returnedHeaders = response.headers;

    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1])
    );
    res.send(data);
  } catch (error) {
    // we don't want to send status 401 here.
    // res.send(error);
  }
};
