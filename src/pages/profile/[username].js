import ProfileScreen from "@/screens/profile/Profile.screen";
import axios from "@/utils/axios";

export async function getStaticProps({ params }) {
  const response = await axios.get(`/user/profile`, {
    params: {
      username: params.username,
    },
  });
  const { data, status, message } = response?.data;

  const statusCode = response.status;

  if (status !== "success") {
    return {
      notFound: true,
      props: {
        code: statusCode,
        message: message,
      },
    };
  }
  return {
    props: {
      user: data.user,
      revalidate: 60,
    },
  };
}

export async function getStaticPaths() {
  const { data } = await axios.get("/user/all-users");
  const users = data.data.users;
  const userNames = users.map((user) => {
    return {
      params: {
        username: user.username,
      },
    };
  });
  return {
    paths: userNames,
    fallback: true,
  };
}

export default function Profile({ user }) {
  return <ProfileScreen user={user} />;
}
