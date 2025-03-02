import { Review } from "@/types/types";

export const reviews: Review[] = [
  {
    id: "nurture",
    title: "Nurture",
    artist: "Porter Robinson",
    type: "music",
    description:
      "A masterful blend of electronic production and organic instrumentation, creating a deeply personal and emotionally resonant experience.",
    rating: 9.5,
    date: "2024-01-15",
    coverImage:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fedm.com%2F.image%2Ft_share%2FMTgwNTE1MDU3Mzg0MzAxOTI4%2Fporterrobinson-nurture-album-cover-1-1611778054-scaled-1.jpg",
    tags: ["electronic", "ambient", "pop"],
  },
  {
    id: "yakuza-like-a-dragon",
    title: "Yakuza: Like a Dragon",
    artist: "Ryu Ga Gotoku Studio",
    type: "game",
    description:
      "A bold reinvention of the Yakuza series that trades beat-em-up action for turn-based RPG combat while maintaining the heart and soul of what makes the franchise special.",
    rating: 9.2,
    date: "2024-04-15",
    coverImage:
      "https://assets.reedpopcdn.com/yakuza-like-a-dragon-review-a-bold-and-brave-new-direction-for-the-series-1604930956923.jpg/BROK/thumbnail/1600x900/format/jpg/quality/80/yakuza-like-a-dragon-review-a-bold-and-brave-new-direction-for-the-series-1604930956923.jpg",
    tags: ["rpg", "turn-based", "story-rich", "open-world"],
  },
  // Add more reviews here
];
