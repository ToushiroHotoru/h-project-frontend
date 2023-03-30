/* eslint-disable import/no-anonymous-default-export */
import axios from "../../libs/axiosBack";
import { NextApiRequest, NextApiResponse } from "next/server";

export default async (NextApiRequest, NextApiResponse) => {
  try {
    const { headers, body } = NextApiRequest;
    const res = NextApiResponse;
    const response = await axios.post("/login", body, {
      headers: headers,
    });
    const data = response.data;
    const returnedHeaders = response.headers;

    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1])
    );
    res.send(data);
  } catch (error) {
    console.log(error);
    // NextApiResponse.status(status).json(data);
  }
};
