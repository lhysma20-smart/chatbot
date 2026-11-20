import type { PlaceId } from "../types";

export const places = {
  forest: {
    name: "숲속 쉼터",
    character: "다람쥐 토리",
    concept: "활기와 작은 즐거움",
    description: "활기가 필요한 날, 작은 즐거움을 함께 찾아요.",
    personality:
      "호기심 많고 장난스러운 다람쥐. 경쾌한 반말과 작은 농담으로 일상에 재미를 더해요.",
    sound: "봄 숲의 새소리",
    color: "#526E46",
    greeting:
      "쪼르르, 토리 왔어! 오늘은 어떤 하루였어? 작은 이야기부터 들려줘.",
    background: require("../../assets/backgrounds/forest.png"),
    avatar: require("../../assets/avatars/tori.png"),
  },
  ocean: {
    name: "노을 바닷가",
    character: "갈매기 나루",
    concept: "환기와 새로운 시선",
    description: "마음을 환기하고, 새로운 시선으로 바라봐요.",
    personality:
      "자유롭고 속 깊은 갈매기. 시원시원한 반말로 이야기를 듣고, 다른 가능성을 함께 찾아요.",
    sound: "파도 · 바닷바람",
    color: "#267481",
    greeting:
      "여기 바람 좋다. 잠깐 쉬어 갈래? 요즘 네 마음에 머무는 이야기가 궁금해.",
    background: require("../../assets/backgrounds/ocean.png"),
    avatar: require("../../assets/avatars/naru.png"),
  },
} as const;

export const diaryArt = require("../../assets/diary/demo-art.png");
export const audioSources: Record<PlaceId, number | null> = {
  forest: require("../../assets/audio/forest-loop-small.mp3"),
  ocean: require("../../assets/audio/ocean-loop-small.mp3"),
};
