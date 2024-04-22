import db from "../db";

export const getLikes = async (threadId: number) => {
  return await db.like.findMany({
    where: {
      threadId,
    },
    include: {
      user: {
        select: {
          username: true,
          fullname: true,
          id: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
    },
  });
};

export const createLike = async (payload: {
  threadId: number;
  userId: number;
}) => {
  const existedThread = await db.thread.findFirst({
    where: {
      id: payload.threadId,
    },
  });

  if (!existedThread) {
    throw new Error("Thread not found");
  }

  const existedLike = await db.like.findFirst({
    where: {
      threadId: payload.threadId,
      userId: payload.userId,
    },
  });

  if (existedLike) {
    return await db.like.deleteMany({
      where: {
        threadId: payload.threadId,
        userId: payload.userId,
      },
    });
  }

  return await db.like.create({
    data: {
      ...payload,
    },
  });
};
