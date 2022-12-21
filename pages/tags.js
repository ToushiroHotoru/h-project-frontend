import { useState } from "react";
import TagDesktop from "../components/Tags/TagDesktop";
import TagMobile from "../components/Tags/TagMobile";
import TagsCss from "../styles/components/Tags.module.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export default function Tags() {
  const [tags, setTags] = useState([
    {
      name: "tag1",
      desc: "this is a description this is a description this is a description this is a description",
      count: "423",
      img: "/tag1.png",
    },
    {
      name: "tag2",
      desc: "this is a description this is a description this is a description this is a description",
      count: "423",
      img: "/tag2.png",
    },
    {
      name: "tag3",
      desc: "this is a description this is a description this is a description this is a description",
      count: "423",
      img: "/tag3.png",
    },
    {
      name: "tag4",
      desc: "this is a description this is a description this is a description this is a description",
      count: "423",
      img: "/tag4.png",
    },
    {
      name: "tag5",
      desc: "this is a description this is a description this is a description this is a description",
      count: "423",
      img: "/tag1.png",
    },
    {
      name: "tag6",
      desc: "this is a description this is a description this is a description this is a description",
      count: "423",
      img: "/tag2.png",
    },
    {
      name: "tag7",
      desc: "this is a description this is a description this is a description this is a description",
      count: "423",
      img: "/tag3.png",
    },
    {
      name: "tag8",
      desc: "this is a description this is a description this is a description this is a description",
      count: "423",
      img: "/tag4.png",
    },
  ]);
  return (
    <div className={isMobile ? TagsCss.tagsMobile : TagsCss.tagsDesktop}>
      {tags.map((item, i) => {
        return (
          <>
            <MobileView>
              {/* <TagDesktop data={item} key={i + 1} /> */}
              <TagMobile data={item} key={i + 1} />
            </MobileView>
            <BrowserView>
              {/* <TagMobile data={item} key={i + 1} /> */}
              <TagDesktop data={item} key={i + 1} />
            </BrowserView>
          </>
        );
      })}
    </div>
  );
}
