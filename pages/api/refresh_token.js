/* eslint-disable import/no-anonymous-default-export */
import axios from "../../libs/axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (NextApiRequest, NextApiResponse) => {
  const { headers } = NextApiRequest;
  try {
    const { data, headers: returnedHeaders } = await axios.post(
      "/refresh", // refresh token Node.js server path
      undefined,
      {
        headers,
      }
    );

    //  Update headers on requester using headers from Node.js server response
    Object.keys(returnedHeaders).forEach((key) =>
      res.setHeader(key, returnedHeaders[key])
    );

    res.status(200).json(data);
  } catch (error) {
    // we don't want to send status 401 here.
    res.send(error);
  }
};
