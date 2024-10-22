const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getStudents = async (name, nickName) => {
  // Define query here
  let query = {
    include: {
      classes: true,
      universities: true,
    },
  };

  // It will generate the query
  let orQuery = [];
  if (name) {
    orQuery.push({
      name: { contains: name, mode: "insensitive" },
    });
  }
  if (nickName) {
    orQuery.push({
      nick_name: { contains: nickName, mode: "insensitive" },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  // Find by query
  const searchedStudents = await prisma.students.findMany(query);

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(searchedStudents);
  return JSONBigInt.parse(serializedStudents);
};

exports.getStudentById = async (id) => {
  // find student by id
  const student = await prisma.students.findFirst({
    where: {
      id: id,
    },
    include: {
      classes: true,
      universities: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(student);
  return JSONBigInt.parse(serializedStudents);
};

exports.createStudent = async (data) => {
  const newStudent = await prisma.students.create({
    data: {
      name: data.name,
      nick_name: data.nick_name,
      profile_picture: data.profile_picture,
      classes: {
        connect: { id: data.class_id },
      },
      universities: {
        connect: { id: data.university_id },
      },
    },
  });

  const serializedStudent = JSONBigInt.stringify(newStudent);
  return JSONBigInt.parse(serializedStudent);
};

exports.updateStudent = async (id, data) => {
  // Update the student data
  const updatedStudent = await prisma.students.update({
    where: { id: id },
    data: {
      name: data.name,
      nick_name: data.nick_name,
      profile_picture: data.profile_picture,
      classes: {
        connect: { id: data.class_id },
      },
      universities: {
        connect: { id: data.university_id },
      },
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudent = JSONBigInt.stringify(updatedStudent);
  return JSONBigInt.parse(serializedStudent);
};

exports.deleteStudentById = async (id) => {
  // Delete the student
  const deletedStudent = await prisma.students.delete({
    where: { id: id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudent = JSONBigInt.stringify(deletedStudent);
  return JSONBigInt.parse(serializedStudent);
};
