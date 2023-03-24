import Head from "next/head";
import axiosPrivate from "./../../libs/axiosPrivate";
import { LINK as API_URL } from "../../libs/changeApiUrl";

export async function getServerSideProps(context) {
  const res = await axiosPrivate.post(`${API_URL}/profile`, {
    username: context.params.username,
  });
  const data = res.data.message;
  console.log(res.data.message);

  return {
    props: {
      data,
    },
  };
}

export default function Profile({ data }) {
  return (
    <>
      <Head>
        <title>Профиль</title>
      </Head>

      <div className="profile">
        <div className="container">
          <h1>Профиль</h1>
          <div>{data.username}</div>
        </div>
      </div>
    </>
  );
}
