// index.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post(`/task`, async (req, res) => {
  const result = await prisma.task.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      assignee: req.body.assignee,
      status: req.body.status,
    },
  });
  res.json(result);
});

app.get("/task/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(task);
});

app.delete(`/task/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.task.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(post);
});

app.get("/search-tasks", async (req, res) => {
  const { searchString } = req.query;
  const draftTasks = await prisma.task.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          description: {
            contains: searchString,
          },
        },
      ],
    },
  });
  res.send(draftTasks);
});

/**
 * logic for our api will go here
 */
export default {
  path: "/api",
  handler: app,
};
