"use server";

import db from "@/utils/db";
import { Job } from "./models";

export async function getPaginatedJobs(page: number, limit: number): Promise<Job[]> {
  // const dummyJob = {
  //   url: "test",
  //   company: "stripe",
  //   title: `software engineer ${getRandomInt(0, 10000)}`,
  //   locations: ["austin, tx", "washington, dc"],
  //   updatedAt: new Date(),
  //   createdAt: new Date()
  // };
  // await sleep(50000);
  // return new Array(10).fill(dummyJob);

  const offset = page * limit;
  const jobs = await db<
    Job[]
  >`SELECT * FROM job ORDER BY updated_at DESC LIMIT ${limit} OFFSET ${offset}`;
  if (!jobs.length) throw new Error("no jobs found");
  return jobs;
}
