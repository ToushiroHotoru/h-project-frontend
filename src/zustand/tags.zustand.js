import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useTagStore = create(
  devtools((set, get) => ({
    selectedTag: [],
    controls: {
      setSelectedTag: (tag) => {
        console.log(get().selectedTag);
        if (!tag) return;
        if (get().selectedTag.includes(tag)) {
          set({
            selectedTag: get().selectedTag.filter(
              (currentTag) => currentTag !== tag
            ),
          });
        } else {
          const tags = [...get().selectedTag.filter(Boolean), tag];
          set({
            selectedTag: tags,
          });
        }
      },
    },
  }))
);

export default useTagStore;
