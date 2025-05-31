import { queryOptions } from "@tanstack/react-query";
import { getJobs } from "./jobs.action";

export const getJobsQuery = queryOptions({
  queryKey: ["getJobs"],
  queryFn: getJobs
});
