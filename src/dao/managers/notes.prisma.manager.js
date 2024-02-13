import { prisma } from '../prismaConfig.js';

const getAll = async (userId, archived) => {
  if (archived) {
    const result = await prisma.note.findMany({
      where: {
        AND: [{ userId: userId }, { archived: { equals: archived.archived } }],
      },
    });
    return result ? result : [];
  }
  const result = await prisma.note.findMany({
    where: { userId: userId },
  });

  return result ? result : [];
};

const getById = async (nid) => {
  return await prisma.note.findUnique({ where: { id: nid } });
};

const create = async (note) => {
  return await prisma.note.create({ data: { ...note } });
};

const update = async (note) => {
  return await prisma.note.update({
    where: { id: note.id },
    data: { ...note },
  });
};

const deleteById = async (nid) => {
  return await prisma.note.delete({ where: { id: nid } });
};

export { getAll, create, getById, update, deleteById };
