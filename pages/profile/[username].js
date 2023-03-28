import Head from "next/head";
import axios from "../../libs/axios";

export async function getServerSideProps(context) {
  const accessToken = context.req.cookies.accessToken;
  console.log(context.req.cookies)
  const res = await axios.post(
    `/profile`,
    {
      username: context.params.username,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

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
