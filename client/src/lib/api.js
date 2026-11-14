const API_URL = "http://localhost:5001/api";

export async function getTeachers() {
  const res = await fetch(`${API_URL}/teachers`);
  return res.json();
}

export async function getLearningTopics() {
  const res = await fetch(`${API_URL}/learning/topics`);
  return res.json();
}

export async function getResources() {
  const res = await fetch(`${API_URL}/resources`);
  return res.json();
}