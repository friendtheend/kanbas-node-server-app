import Database from "../Database/index.js";
export function deleteEnrollment(enrollmentId) {
 const { enrollments } = Database;
 Database.enrollments = enrollments.filter((enrollment) => enrollment._id !== enrollmentId);
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}


export function findAllEnrollments() {
  return Database.enrollments;
}

export function createEnrollment(enrollment) {
  Database.enrollments = [...Database.enrollments, enrollment];
}
