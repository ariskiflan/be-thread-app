import db from "../db";

export const follow = async (followerId: number, followingId: number) => {
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });

  if (existingFollow) {
    await db.follow.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });

    return "unfollowing successful";
  }

  const follow = await db.follow.create({
    data: {
      followerId,
      followingId,
    },
  });

  return "following successful";
};

export const getFollower = async (followingId: number) => {
  return await db.follow.findMany({
    where: {
      followingId: +followingId,
    },
    select: {
      follower: {
        select: {
          id: true,
          fullname: true,
          username: true,
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

export const getFollowing = async (followerId: number) => {
  return await db.follow.findMany({
    where: {
      followerId: +followerId,
    },
    include: {
      following: {
        select: {
          id: true,
          fullname: true,
          username: true,
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
