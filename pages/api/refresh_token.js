/* eslint-disable import/no-anonymous-default-export */
import axios from "../../libs/axios";
import { NextApiRequest, NextApiResponse } from "next/server";
import Cookies from "js-cookie";

export default async (NextApiRequest, NextApiResponse) => {
  try {
    console.log(NextApiRequest.cookies);
    const { headers } = NextApiRequest;
    const res = NextApiResponse;
    const response = await axios.get("/refresh");

    // const data = response.data;
    const returnedHeaders = response.headers;

    // console.log(returnedHeaders);
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1])
    );
    // res.send(data);
  } catch (error) {
    // we don't want to send status 401 here.
    // res.send(error);
    // console.log(error);
  }
};
