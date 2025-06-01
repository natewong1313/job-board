import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getPaginatedJobs } from "./jobs.action";

export const getPaginatedJobsQuery = (page: number) =>
  queryOptions({
    queryKey: ["getJobs", page],
    queryFn: () => getPaginatedJobs(page, 10),
    placeholderData: keepPreviousData
  });
