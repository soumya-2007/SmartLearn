
import express from "express";

const router = express.Router();

// Sample teacher data for the prototype
const sampleTeachers = [
  {
    id: 1,
    name: "Aarav Sharma",
    bio: "Programming instructor specialising in Python.",
    experienceYears: 4,
    rating: 4.8,
    topics: ["Python", "JavaScript"],
  },
  {
    id: 2,
    name: "Priya Verma",
    bio: "Database instructor with practical SQL experience.",
    experienceYears: 6,
    rating: 4.9,
    topics: ["SQL", "SQL Joins"],
  },
  {
    id: 3,
    name: "Rohan Mehta",
    bio: "Computer science tutor specialising in programming fundamentals.",
    experienceYears: 3,
    rating: 4.6,
    topics: ["Python", "Data Structures"],
  },
];

// Search teachers by topic
router.get("/", (req, res) => {
  const topic = req.query.topic?.trim();

  if (!topic) {
    return res.status(400).json({
      success: false,
      message: "Please provide a topic, e.g. /api/teachers?topic=Python",
    });
  }

  const matchingTeachers = sampleTeachers.filter((teacher) =>
    teacher.topics.some((item) =>
      item.toLowerCase().includes(topic.toLowerCase())
    )
  );

  res.status(200).json({
    success: true,
    topic,
    count: matchingTeachers.length,
    teachers: matchingTeachers,
  });
});

export default router;
