// API Service for Course Registration System
const BASE_URL = 'http://localhost:8080';

// Fallback Mock Data for demo mode when backend is offline
const MOCK_COURSES = [
  { courseID: 'CS101', courseName: 'Java Essentials', trainer: 'Dr. Robert Vance', duration: 12, category: 'Computer Science', credits: 4, level: 'Beginner' },
  { courseID: 'CS204', courseName: 'Python for ML', trainer: 'Prof. Sophia Chen', duration: 14, category: 'Data Science', credits: 4, level: 'Intermediate' },
  { courseID: 'CS302', courseName: 'Spring Boot', trainer: 'Dr. Michael Scott', duration: 10, category: 'Web Development', credits: 3, level: 'Advanced' },
  { courseID: 'CS102', courseName: 'C Programming', trainer: 'Prof. Alan Turing', duration: 8, category: 'Computer Science', credits: 3, level: 'Beginner' },
  { courseID: 'DS401', courseName: 'Data Structures & Algorithms', trainer: 'Dr. Elena Rostova', duration: 16, category: 'Computer Science', credits: 4, level: 'Intermediate' },
  { courseID: 'AI502', courseName: 'Deep Learning & Neural Nets', trainer: 'Dr. Marcus Vance', duration: 12, category: 'Artificial Intelligence', credits: 4, level: 'Advanced' }
];

const MOCK_ENROLLED = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@university.edu', course_name: 'Java Essentials', registeredAt: '2026-07-28' },
  { id: 2, name: 'Samantha Miller', email: 'samantha.m@university.edu', course_name: 'Python for ML', registeredAt: '2026-07-29' },
  { id: 3, name: 'David Kim', email: 'david.k@university.edu', course_name: 'Spring Boot', registeredAt: '2026-07-30' },
  { id: 4, name: 'Emily Davis', email: 'emily.d@university.edu', course_name: 'Java Essentials', registeredAt: '2026-07-30' },
  { id: 5, name: 'Marcus Taylor', email: 'marcus.t@university.edu', course_name: 'C Programming', registeredAt: '2026-07-31' },
];

// Helper to simulate network latency in mock mode
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAvailableCourses = async () => {
  try {
    const response = await fetch(`${BASE_URL}/courses`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return { data, isLive: true };
  } catch (error) {
    console.warn('Backend unavailable, falling back to cached portal courses:', error.message);
    await delay(300);
    return { data: MOCK_COURSES, isLive: false };
  }
};

export const fetchEnrolledStudents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/courses/enrolled`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return { data, isLive: true };
  } catch (error) {
    console.warn('Backend unavailable, falling back to mock enrollment list:', error.message);
    await delay(300);
    return { data: MOCK_ENROLLED, isLive: false };
  }
};

export const registerForCourse = async (name, email, courseName) => {
  try {
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('course_name', courseName);

    const response = await fetch(`${BASE_URL}/course/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) throw new Error(`Registration failed (${response.status})`);
    const message = await response.text();
    return { success: true, message, isLive: true };
  } catch (error) {
    console.warn('Backend unavailable, completing simulated course registration:', error.message);
    await delay(500);
    // Add to mock list locally for interactive session feedback
    const newEnrollment = {
      id: MOCK_ENROLLED.length + 1,
      name,
      email,
      course_name: courseName,
      registeredAt: new Date().toISOString().split('T')[0],
    };
    MOCK_ENROLLED.unshift(newEnrollment);

    return {
      success: true,
      message: `Congratulations ${name} your enrollment for ${courseName} was successful!!`,
      isLive: false,
    };
  }
};
