package com.example.Course.Registration.System.Repository;

import com.example.Course.Registration.System.Model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface CourseRepo extends JpaRepository<Course,String> {
}
