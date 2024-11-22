import * as enrollmentsDao from "./dao.js";
export default function EnrollmentRoutes(app) {
 app.delete("/api/enrollments/:enrollmentId", (req, res) => {
   const { enrollmentId } = req.params;
   enrollmentsDao.deleteEnrollment(enrollmentId);
   res.sendStatus(204);
 });

 app.post("/api/enrollments", (req, res) => {
    const enrollment  = req.body;
    console.log("new enrollment",enrollment)
    const newEnrollment = enrollmentsDao.createEnrollment(enrollment);
    res.send(newEnrollment);
  });

}


