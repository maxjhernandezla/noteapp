import { prisma } from '../prismaConfig.js';

const create = async (user) => {
  return await prisma.user.create({ data: { ...user } });
};

const getUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

export { create, getUserByEmail };
