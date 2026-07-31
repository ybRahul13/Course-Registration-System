function showCourses() {
  fetch("http://127.0.0.1:8080/courses") //API End point
    .then((response) => response.json())
    .then((courses) => {
      const dataTable = document.getElementById("coursetable");

      courses.forEach((course) => {
        var row = `<tr>
            <td>${course.courseID}</td>
            <td>${course.courseName}</td>
            <td>${course.trainer}</td>
            <td>${course.duration}</td>
            </tr>`;

        dataTable.innerHTML += row;
      });
    });
}
function showEnrolledStudents() {
  fetch("http://localhost:8080/courses/enrolled") //API End point
    .then((response) => response.json()) //Http response into json object
    .then((students) => {
      const dataTable = document.getElementById("enrolledtable");

      students.forEach((student) => {
        var row = `<tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course_name}</td>
            </tr>`;

        dataTable.innerHTML += row;
      });
    });
}
