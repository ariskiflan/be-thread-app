import db from "../db";
import { registerValidator } from "../lib/validation/register";
import { Iregister } from "../type/app";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async () => {
  return await db.user.findMany();
};

export const getUser = async (id: number) => {
  return await db.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      fullname: true,
      profile: {
        select: {
          avatar: true,
          cover: true,
          bio: true,
        },
      },
      follower: {
        select: {
          followerId: true,
        },
      },
      following: {
        select: {
          followingId: true,
        },
      },
    },
  });
};

export const register = async (payload: Iregister) => {
  const { error, value } = registerValidator.validate(payload);
  if (error) throw new Error(error.details[0].message);

  const isExist = await db.user.findFirst({
    where: {
      OR: [
        {
          username: value.username,
        },
        {
          email: value.email,
        },
      ],
    },
  });

  if (isExist) throw new Error("Username or Email already exist");

  const hasPassword = await bcrypt.hash(value.password, 10);
  value.password = hasPassword;

  const user = await db.user.create({
    data: {
      ...value,
    },
  });

  const profile = await db.profile.create({
    data: {
      userId: user.id,
    },
  });

  return { user, profile };
};

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const user = await db.user.findFirst({
    where: {
      OR: [
        {
          username,
        },
        {
          email: username,
        },
      ],
    },
  });

  if (!user) throw new Error("user or password is not valid");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("user or password is not valid");

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1D",
    }
  );

  return token;
};

export const getUsersSearch = async () => {
  return await db.user.findMany({
    include: {
      following: {
        select: {
          followingId: true,
        },
      },
      follower: {
        select: {
          followerId: true,
        },
      },
      profile: {
        select: {
          avatar: true,
          bio: true,
        },
      },
    },
  });
};

// export const getOtherUsers = async (id: number) => {
//   const user = await db.$queryRaw`
//     SELECT "User".id, "User".username, "User".fullname, "Profile".avatar
//     FROM "User"
//     LEFT JOIN "Profile" ON "User".id = "Profile"."userId"
//     where "User".id != ${id}
//     ORDER BY random()
//     LIMIT 5`;

//   return user;
// };

export const getUserNotId = async (id: number) => {
  return await db.user.findMany({
    where: {
      NOT: {
        id: id,
      },
    },
    include: {
      follower: {
        select: {
          followerId: true,
        },
      },
      following: {
        select: {
          followingId: true,
        },
      },
      profile: {
        select: {
          avatar: true,
          bio: true,
        },
      },
    },
  });
};
