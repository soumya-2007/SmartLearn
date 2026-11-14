
import express from "express";

const router = express.Router();

const topics = [
  {
    id: 1,
    name: "Python Programming",
    subject: "Programming",
    description: "Learn Python fundamentals and programming concepts.",
  },
  {
    id: 2,
    name: "SQL Joins",
    subject: "Database Management",
    description: "Understand how to combine data from multiple tables.",
  },
  {
    id: 3,
    name: "Data Structures",
    subject: "Computer Science",
    description: "Learn arrays, stacks, queues and linked lists.",
  },
];


router.get("/topics", (req, res) => {
  res.status(200).json({
    success: true,
    count: topics.length,
    topics,
  });
});


router.get("/topics/search", (req, res) => {
  const search = req.query.name?.trim();

  if (!search) {
    return res.status(400).json({
      success: false,
      message: "Please provide a topic name.",
    });
  }

  const results = topics.filter((topic) =>
    topic.name.toLowerCase().includes(search.toLowerCase())
  );

  res.status(200).json({
    success: true,
    count: results.length,
    topics: results,
  });
});

export default router;
