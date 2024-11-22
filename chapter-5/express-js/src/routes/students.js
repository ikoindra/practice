const express = require("express");
const {
  validateGetStudents,
  validateGetStudentById,
  validateDeleteStudentById,
  validateCreateStudent,
  validateUpdateStudent,
} = require("../middlewares/students");
const { authorization } = require("../middlewares/auth");
const {
  getStudents,
  getStudentById,
  deleteStudentById,
  createStudent,
  updateStudent,
} = require("../controllers/students");

const router = express.Router();

router
  .route("/")
  .get(authorization(1, 2), validateGetStudents, getStudents)
  .post(authorization(1), validateCreateStudent, createStudent);

router
  .route("/:id")
  .get(authorization(1, 2), validateGetStudentById, getStudentById)
  .put(authorization(1), validateUpdateStudent, updateStudent)
  .delete(authorization(1), validateDeleteStudentById, deleteStudentById);

module.exports = router;
