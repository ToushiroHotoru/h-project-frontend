/* eslint-disable import/no-anonymous-default-export */
import axios from "../../libs/axios";
import { NextApiRequest, NextApiResponse } from "next/server";

export default async (NextApiRequest, NextApiResponse) => {
  const { headers, body } = NextApiRequest;

  try {
    const { data, headers: returnedHeaders } = await axios.post(
      "/login", // Node.js backend path
      body, // Login body (email + password)
      { headers } // Headers from the Next.js Client
    );
    //  Update headers on requester using headers from Node.js server response
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1].toString())
    );
    res.send(data); // Send data from Node.js server response
  } catch ({ response: { status, data } }) {
    // Send status (probably 401) so the axios interceptor can run.
    res.status(status).json(data);
  }
};
