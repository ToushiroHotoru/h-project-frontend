import { Grid } from "@chakra-ui/react";

import Tag from "@/components/tags/tag/Tag";

export default function TagsScreen({ tags }) {
  return (
    <div className="container">
      <Grid
        gap="15px"
        gridTemplateColumns={{
          x450: "1fr 1fr",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
      >
        {tags.map((item) => (
          <Tag data={item} key={item._id} />
        ))}
      </Grid>
    </div>
  );
}
