"use server";

import { Job } from "./models";

export async function getJobs(): Promise<Job[]> {
  return [
    {
      url: "test",
      company: "stripe",
      title: "software engineer",
      locations: ["austin, tx", "washington, dc"],
      updatedAt: new Date(),
      createdAt: new Date()
    }
  ];
}
