const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getStudents = (name, nickName, bachelor) => {
  return studentRepository.getStudents(name, nickName, bachelor);
};

exports.getStudentById = (id) => {
  const student = studentRepository.getStudentById(id);
  if (!student) {
    throw new NotFoundError("Student is Not Found!");
  }

  return student;
};

exports.createStudent = async (data, file) => {
  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }
  return studentRepository.createStudent(data);
};

exports.updateStudent = async (id, data, file) => {
  // find student is exist or not (validate the data)
  const existingStudent = studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingStudent, // existing Student
    ...data,
  };

  // Upload file to image kit
  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }

  // if exist, we will update the student data
  const updatedStudent = studentRepository.updateStudent(id, data);
  if (!updatedStudent) {
    throw new InternalServerError(["Failed to update student!"]);
  }

  return updatedStudent;
};

exports.deleteStudentById = (id) => {
  const existingStudent = studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is Not Found!");
  }

  const deletedStudent = studentRepository.deleteStudentById(id);
  if (!deletedStudent) {
    throw new InternalServerError(["Failed to delete student!"]);
  }

  return deletedStudent;
};
