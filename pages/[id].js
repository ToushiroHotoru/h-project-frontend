export async function getStaticProps({ params }) {
  const { id } = params;

  const res = await fetch("https://h-project.herokuapp.com/manga", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return {
    props: { manga: data[0] }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const res = await fetch(`https://h-project.herokuapp.com/mangas`);
  const data = await res.json();

  const paths = data.map((post) => ({
    params: { id: post._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Manga({ manga }) {
  console.log(manga);
  return <div>Manga {manga.title}</div>;
}
