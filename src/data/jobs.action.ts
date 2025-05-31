"use server";

import { Job } from "./models";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function getJobs(): Promise<Job[]> {
  const dummyJob = {
    url: "test",
    company: "stripe",
    title: `software engineer ${getRandomInt(0, 10000)}`,
    locations: ["austin, tx", "washington, dc"],
    updatedAt: new Date(),
    createdAt: new Date()
  };
  // await sleep(50000);
  return new Array(10).fill(dummyJob);
}
