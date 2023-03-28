import Head from "next/head";
import axios from "../../libs/axios";
import { LINK as API_URL } from "../../libs/changeApiUrl";

export async function getServerSideProps(context) {
  const res = await axios.post(`/profile`, {
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
