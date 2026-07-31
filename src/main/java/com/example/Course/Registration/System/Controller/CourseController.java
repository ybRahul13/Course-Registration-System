package com.example.Course.Registration.System.Controller;

import com.example.Course.Registration.System.Model.Course;
import com.example.Course.Registration.System.Model.Course_Registry;
import com.example.Course.Registration.System.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
public class CourseController {
    @Autowired
    CourseService CourseService;
    @GetMapping("courses")
    public List<Course> avaliableCourses(){
        return CourseService.avaliableCourse();
    }
    @GetMapping("courses/enrolled")
    public List<Course_Registry> enrolledCourse(){
        return CourseService.enrolledCourse();
    }
    @PostMapping("course/register")
    public String registerCourse(@RequestParam("name") String name,
                               @RequestParam("email")String email,
                               @RequestParam("course_name")String course_name){
        CourseService.registerCourse(name,email,course_name);
        return "Congratulations "+name+" your enrollment successful!!";

    }
}
