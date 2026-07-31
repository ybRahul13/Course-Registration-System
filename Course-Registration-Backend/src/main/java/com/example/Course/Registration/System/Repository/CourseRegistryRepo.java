package com.example.Course.Registration.System.Repository;

import com.example.Course.Registration.System.Model.Course_Registry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRegistryRepo extends JpaRepository<Course_Registry,Integer> {
}
