package com.example.Course.Registration.System.Service;

import com.example.Course.Registration.System.Model.Course;
import com.example.Course.Registration.System.Model.Course_Registry;
import com.example.Course.Registration.System.Repository.CourseRegistryRepo;
import com.example.Course.Registration.System.Repository.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    CourseRepo CourseRepo;
    public List<Course> avaliableCourse(){
        return CourseRepo.findAll();
    }
    @Autowired
    CourseRegistryRepo CourseRegistryRepo;
    public List<Course_Registry> enrolledCourse() {
        return CourseRegistryRepo.findAll();
    }

    public void registerCourse(String name, String email, String course_name) {
        Course_Registry course_registry = new Course_Registry(null,name,email,course_name);
        CourseRegistryRepo.save(course_registry);
    }
}
