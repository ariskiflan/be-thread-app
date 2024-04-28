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
              bio: true,
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
              bio: true,
            },
          },
        },
      },
    },
  });
};

export const getFollowingUsers = async (userId: number) => {
  const followingUsers = await db.follow.findMany({
    where: {
      followerId: userId,
    },
    include: {
      following: {
        include: {
          profile: {
            select: {
              avatar: true,
              bio: true,
            },
          },
        },
      },
    },
  });
  return followingUsers.map((follow) => follow.following);
};

export const getFollowersUsers = async (userId: number) => {
  const followersUsers = await db.follow.findMany({
    where: {
      followingId: userId,
    },
    include: {
      follower: {
        include: {
          profile: {
            select: {
              avatar: true,
              bio: true,
            },
          },
          follower: true,
        },
      },
    },
  });
  return followersUsers.map((follow) => follow.follower);
};
