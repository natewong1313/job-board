import Faq from "@/components/faq";
import Footer from "@/components/footer";
import JobsTable from "@/components/jobs-table";
import Navbar from "@/components/navbar";
import { getPaginatedJobsQuery } from "@/data/jobs.hook";
import { getQueryClient } from "@/utils/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getPaginatedJobsQuery(0));
  return (
    <main>
      <div className="flex flex-col max-w-3xl mx-auto space-y-8">
        <Navbar />
        <div>
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="mt-2">
            Finding jobs is a pain in the ass these days. Are you tired of finding the
            perfect job on LinkedIn, only for it to have already closed by the time you
            open the application?
          </p>
          <p className="mt-2">
            Below is a job board that scrapes job listings continuously from thousands of
            companies worldwide, getting you access to top jobs before they hit social
            media platforms like LinkedIn and Indeed.
          </p>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <JobsTable />
        </HydrationBoundary>
        <div>
          <Faq />
        </div>
      </div>
      <Footer />
    </main>
  );
}
