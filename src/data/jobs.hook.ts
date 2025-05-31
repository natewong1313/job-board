import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getJobs } from "./jobs.action";

export const getPaginatedJobsQuery = (page: number) =>
  queryOptions({
    queryKey: ["getJobs", page],
    queryFn: getJobs,
    placeholderData: keepPreviousData
  });
