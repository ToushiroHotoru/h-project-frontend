import Head from "next/head";
import instance from "/libs/axiosFront";
import store from "../../redux/store";
// export const getServerSideProps = user({
//   callback: async (_, store) => {
//     const dispatch = store;
//     await dispatch(fetchFrogs());

//     return {
//       props: {
//         frogs: store.getState().frogsReducer.frogs,
//       },
//     };
//   },
// });
export async function getServerSideProps(context) {
  const username = context.query.username;
  const res = await instance.get(`/api/user`, {
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
