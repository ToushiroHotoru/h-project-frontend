/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next/server";
import axiosBack from "../../libs/axiosBack";

export default async (NextApiRequest, NextApiResponse) => {
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
};
