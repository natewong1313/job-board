import JobsTable from "@/components/jobs-table";
import Navbar from "@/components/navbar";
import { getJobsQuery } from "@/data/jobs.hook";
import { getQueryClient } from "@/utils/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getJobsQuery);
  return (
    <main>
      <div className="flex flex-col max-w-3xl mx-auto">
        <Navbar />
        <div className="mt-4">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="mt-2">
            Finding jobs is a pain in the ass these days. Are you tired of finding the
            perfect job on LinkedIn, only for it to have already closed by the time you
            open the application?
          </p>
          <p className="mt-2">
            Below is a job board that scrapes job listings every hour from thousands of
            companies worldwide, getting you access to top jobs before they hit social
            media platforms like LinkedIn and Indeed.
          </p>
        </div>
        <div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <JobsTable />
          </HydrationBoundary>
        </div>
      </div>
      <div className="bg-gray-100 border-t border-gray-200 w-full h-10">
        <div className="max-w-3xl flex justify-between items-center mx-auto h-full text-gray-700">
          <a href="">source code</a>
          <p>made with 🧡 in austin tx</p>
        </div>
      </div>
    </main>
  );
}
