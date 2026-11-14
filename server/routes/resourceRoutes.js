
import express from "express";

const router = express.Router();

const resources = [
  {
    id: 1,
    title: "Python Official Tutorial",
    url: "https://docs.python.org/3/tutorial/",
    resourceType: "ARTICLE",
    topic: "Python",
  },
  {
    id: 2,
    title: "JavaScript Guide",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    resourceType: "ARTICLE",
    topic: "JavaScript",
  },
  {
    id: 3,
    title: "SQL Tutorial",
    url: "https://www.sqltutorial.org/",
    resourceType: "WEBSITE",
    topic: "SQL",
  },
  {
    id: 4,
    title: "Python Programming Basics",
    url: "https://www.w3schools.com/python/",
    resourceType: "WEBSITE",
    topic: "Python",
  },
];

router.get("/", (req, res) => {
  const topic = req.query.topic?.trim();

  if (!topic) {
    return res.status(400).json({
      success: false,
      message: "Please provide a topic to search.",
    });
  }

  const matchingResources = resources.filter((resource) =>
    resource.topic.toLowerCase().includes(topic.toLowerCase())
  );

  res.status(200).json({
    success: true,
    topic,
    count: matchingResources.length,
    resources: matchingResources,
  });
});

export default router;
