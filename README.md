Project Briefing :
I created a React project using AG Grid for the table view, taking advantage of its built-in features to efficiently handle large datasets, apply filters, sorting, and more. On the backend, I developed an API endpoint to serve the users' dataset by reading it from a user file, ensuring dynamic data retrieval.
To provide more flexibility, I implemented our own custom URL shortening technique. With this solution, when users apply filters or sorting, a fully-formed URL representing those parameters is generated and then shortened. The shortened URL ensures that any user who accesses it will automatically have the same filters and sorting applied, preserving the exact view.
By creating our own URL shortener, we now have greater control over how the URLs are structured and can adapt the solution to future requirements more easily, providing a more tailored and flexible user experience.

1. The CEO is a real person, and you're talking to her; how do you respond?
   Answer :
   Hey! Glad you're loving the filters and sorting on the user list page – really appreciate the feedback. I totally get what you mean about the long URLs with all those characters. As we’re currently planning to implement a URL shortener approach to make those links short. We're working on it, and it'll definitely make things cleaner and easier to share.

2. Next steps from an engineering process perspective? How do you think about planning, prioritization, and scheduling?
   Answer :
   From an engineering process perspective, the next steps would involve conducting research to identify the most effective approaches for implementing a URL shortening solution. This includes evaluating available external libraries and tools that could help address the problem efficiently. Once we've identified the optimal approach, we will estimate the time required for implementation and assess its complexity.
   Following this, we'll prioritize the task within our current roadmap, ensuring it aligns with our overall priorities. The work will be broken down into smaller, manageable tasks, which will allow us to accelerate development and deliver the solution in a timely manner. We'll ensure that the entire process is aligned with best practices for code quality and scalability.

3. Do you like writing comprehensive technical specs or proposals? If so, framing your solution as one of these could be good.
4. Or: if you prefer to code: You could choose to write a backend service that has some API routes representative of a solution to her problem; or some functions that could be plugged in to a hypothetical web app to do it.
   Answer :
   I prefer focusing on implementation, so I’d start by developing a backend service with API routes to address the URL shortening problem. This would involve creating functions that could easily integrate into a web app, ensuring scalability and efficiency. Once the core functionality is in place, we can refine the details and ensure it aligns with the overall system architecture.

5. What kind of ongoing maintenance will your solution require? Any monitoring or metrics you might want to think about, either business-facing or more engineering/operational?
   Answer :
   The URL shortener solution I’ve implemented is designed to be low-maintenance, but ongoing monitoring will be essential. We’ll need to keep an eye on:

   1. API Health: Ensuring response times and error rates remain optimal.
   2. Usage Tracking: Monitoring the volume of requests to plan for scaling as necessary.
      These measures will help keep the system stable, scalable, and secure over time.

6. How can we automate testing of your solution to ensure it continues to work as expected?
   To automate testing and ensure the solution continues to work as expected we can write test cases to cover different scenarios and integrate them with GitHub Actions. This will automatically run the tests on every commit, ensuring the solution works as expected and catching any issues early.

7. You own this app. You can change anything you'd like about it. Maybe the solution isn't to add something new, but to change something that already exists.
   If I owned the app, I’d focus on optimizing the existing UI for a more intuitive experience, particularly for filtering and sorting. I’d also improve performance to ensure faster load times and a smoother experience, especially with larger datasets. The goal would be to enhance usability without overcomplicating the app.
