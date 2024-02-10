import { Grid, Box, Heading } from "@chakra-ui/react";

import MangaTile from "@/components/mangas/mangaTile/MangaTile";
import newMangaCss from "@/styles/components/NewManga.module.css";

export default function HomePageMangasSection({
  title,
  mangas,
  headingType = "h2",
}) {
  return (
    <section
      className={`${newMangaCss.home_mangas_sections} new_mangas_section`}
    >
      <Heading
        as={headingType}
        size={{ base: "lg", xl: "xl" }}
        marginBottom="12px"
      >
        {title}
      </Heading>
      <Grid
        gap={{ base: "15px", md: "20px", lg: "30px" }}
        gridTemplateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
      >
        {mangas.map((item, i) => {
          return <MangaTile props={item} key={item._id} />;
        })}
      </Grid>
    </section>
  );
}
