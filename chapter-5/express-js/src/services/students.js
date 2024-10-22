const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getStudents = async (name, nickName) => {
  return studentRepository.getStudents(name, nickName);
};

exports.getStudentById = async (id) => {
  const student = await studentRepository.getStudentById(id);
  if (!student) {
    throw new NotFoundError("Student is Not Found!");
  }

  return student;
};

exports.createStudent = async (data, file) => {
  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }
  return studentRepository.createStudent(data);
};

exports.updateStudent = async (id, data, file) => {
  const existingStudent = await studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is Not Found!");
  }

  data = {
    ...existingStudent,
    ...data,
  };

  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  } else {
    data.profile_picture = existingStudent.profile_picture;
  }

  const updatedStudent = await studentRepository.updateStudent(id, data);
  if (!updatedStudent) {
    throw new InternalServerError(["Failed to update student!"]);
  }

  return updatedStudent;
};

exports.deleteStudentById = async (id) => {
  const existingStudent = await studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is Not Found!");
  }

  const deletedStudent = await studentRepository.deleteStudentById(id);
  if (!deletedStudent) {
    throw new InternalServerError(["Failed to delete student!"]);
  }

  return deletedStudent;
};
