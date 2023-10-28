import Head from "next/head";
import axios from "@/utils/axios";

export async function getServerSideProps(context) {
  const username = context.query.username;
  const res = await axios.get(`/api/user`, {
    params: {
      username: username,
    },
  });
  const user = res.data.user;
  return {
    props: { user },
  };
}

export default function Profile({ user }) {
  if (!user) {
    return (
      <>
        <Head>
          <title>Профиль</title>
        </Head>

        <div className="profile">
          <div className="container">
            <h1>Не авторизованы</h1>
          </div>
        </div>
      </>
    );
  }

  if (user) {
    return (
      <>
        <Head>
          <title>Профиль</title>
        </Head>

        <div className="profile">
          <div className="container">
            <h1>Профиль</h1>
            <div>{user.username}</div>
          </div>
        </div>
      </>
    );
  }
}
