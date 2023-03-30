import Head from "next/head";
import axios from "../../libs/axiosBack";

export async function getServerSideProps(context) {
  const accessToken = context.req.cookies.accessToken;
  const res = await axios.get(`/user`, {
    params: {
      username: context.params.username,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = res.data.profile;

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
