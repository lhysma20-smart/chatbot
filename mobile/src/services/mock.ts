import demo from "../config/demo.json";
import type {
  ApprovedSnapshot,
  Message,
  PlaceId,
  Post,
  Session,
} from "../types";

const characterReplies: Record<PlaceId, string[]> = {
  forest: [
    "쪼르르, 듣고 있어! 오늘 네 이야기를 조금 더 들려줄래?",
    "그랬구나. 네 속도로 말해도 돼. 나는 여기 나뭇가지에 앉아 있을게.",
    "오늘 너를 위해 해주고 싶은 작은 일이 있어? 도토리만큼 작아도 좋아!",
  ],
  ocean: [
    "네 이야기 듣고 있어. 그 일에서 가장 마음에 남은 건 뭐야?",
    "괜찮다면 잠깐 멀리서 볼까? 네가 가장 바랐던 건 무엇이었어?",
    "당장 답을 정하지 않아도 돼. 여기서 잠깐 같이 바람이나 맞자.",
  ],
};

export const mockConfig = { delayMs: 800, failNext: false };
export const id = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
export const now = () => new Date().toISOString();
async function delay(signal?: AbortSignal) {
  if (signal?.aborted) throw new Error("취소됨");
  await new Promise<void>((resolve, reject) => {
    const cancel = () => {
      clearTimeout(timer);
      reject(new Error("취소됨"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", cancel);
      resolve();
    }, mockConfig.delayMs);
    signal?.addEventListener("abort", cancel, { once: true });
  });
  if (mockConfig.failNext) {
    mockConfig.failNext = false;
    throw new Error("시연 실패입니다. 다시 시도해 주세요.");
  }
}
export const ChatService = {
  async send(
    sessionId: string,
    message: string,
    history: Message[],
    placeId?: PlaceId,
  ): Promise<Message> {
    await delay();
    const replies = placeId
      ? characterReplies[placeId]
      : [
          "이야기해 줘서 고마워. 그 순간 어떤 마음이 가장 크게 느껴졌어?",
          "그 마음을 서둘러 정리하지 않아도 괜찮아. 지금 너에게 필요한 건 무엇일까?",
          "오늘의 너에게 건네고 싶은 한마디가 있다면 들려줄래?",
        ];
    return {
      id: id(),
      role: "assistant",
      text: replies[
        history.filter((m) => m.role === "user").length % replies.length
      ],
      createdAt: now(),
      status: "sent",
    };
  },
};
export const DiaryService = {
  async summarize(sessionId: string, session: Session, signal?: AbortSignal) {
    await delay(signal);
    return session.isDemo
      ? {
          summary: demo.summary,
          emotions: demo.suggestedEmotions,
          symbols: ["우산", "새싹"],
        }
      : {
          summary: session.messages
            .filter((m) => m.role === "user" && m.status === "sent")
            .map((m) => m.text)
            .join("\n"),
          emotions: ["직접 적어 주세요"],
          symbols: [],
        };
  },
  async generate(approvedSummary: string, signal?: AbortSignal) {
    await delay(signal);
    return {
      title: demo.diary.title,
      poem: demo.diary.poem,
      imageKey: "demo-art" as const,
      interpretation: `${demo.diary.interpretation}\n제공된 예시 작품·본문입니다. 승인한 요약을 바탕으로 직접 수정해 주세요.`,
    };
  },
};
export const FeedService = {
  async publish(
    snapshot: ApprovedSnapshot,
    signal?: AbortSignal,
  ): Promise<Post> {
    await delay(signal);
    // Explicit allowlist: never spread a Diary/Session into the public model.
    return {
      id: id(),
      alias: "익명의 산책자",
      title: snapshot.title,
      poem: snapshot.poem,
      imageKey: snapshot.imageKey,
      reactions: 0,
      reacted: false,
      createdAt: now(),
      comments: [],
    };
  },
};
export function newSession(
  placeId: Session["placeId"],
  greeting: string,
  useDemo = false,
): Session {
  return {
    id: id(),
    placeId,
    createdAt: now(),
    updatedAt: now(),
    isDemo: useDemo,
    messages: useDemo
      ? demo.messages.map((m) => ({
          ...m,
          role: m.role as Message["role"],
          id: id(),
          createdAt: now(),
          status: "sent",
        }))
      : [
          {
            id: id(),
            role: "assistant",
            text: greeting,
            createdAt: now(),
            status: "sent",
          },
        ],
  };
}
