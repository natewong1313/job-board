const faqs = [
  {
    question: "What companies does this job board monitor?",
    answer:
      "Companies that use Greenhouse, Ashby, or Lever as their job listing software are currently monitored, with more to come. Currently there are a few thousand companies that get scraped."
  },
  {
    question: "How do I get alerted of new job listings?",
    answer: "Create an account to configure your notification settings."
  },
  {
    question: "How often are new job listings fetched?",
    answer: "New job listings are scraped every few minutes."
  },
  {
    question: "Does this cost money?",
    answer: "This job board is currently completely free to use!"
  }
];
export default function Faq() {
  return (
    <>
      <h1 className="font-medium">FAQ</h1>
      <dl className="my-2 space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <dt className="font-semibold">{faq.question}</dt>
            <dd className="pl-4">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
