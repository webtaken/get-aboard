import { Node } from "reactflow";
import { DataTicketNodeDemo } from "./TicketNodeDemo";

export const initialNodes: Node<DataTicketNodeDemo>[] = [
  {
    id: "0",
    type: "ticket",
    position: { x: 0, y: 50 },
    data: {
      title: "Welcome to Veercel 🚀",
      description: `<h1>Welcome</h1><p>Welcome to Veercel - where innovation meets excellence! We're thrilled to have you on board as a new software engineer, and we're confident that your skills and passion for technology will contribute significantly to our mission of empowering developers worldwide.</p><h1>Company overview</h1><p>At Veercel, our mission is to accelerate web development and deployment. We're not just a hosting platform; we're a community-driven ecosystem that enables developers to build, deploy, and scale their applications seamlessly. Our commitment to speed, simplicity, and collaboration is at the core of everything we do.</p><h2>Values</h2><ul><li><p><strong>Developer-Centric:</strong> We prioritize the needs and experiences of developers</p></li><li><p><strong>Continuous Improvement:</strong> Embrace change as an opportunity to learn and grow.</p></li><li><p><strong>User-Focused:</strong> Understand our users and build solutions that meet their evolving needs.</p></li></ul><p>Read more <a target="_blank" rel="noopener noreferrer nofollow" href="https://vercel.com/about">about us</a>.</p><h2>Onboarding Process:</h2><p>These are the main steps you'll follow for a success onboarding 😀. Follow the flow for a more organized introduction.</p><ol><li><p><strong>Introduction to Teams: </strong>Engage in presentations from department heads to understand how each unit contributes to our overall success. Join our <a target="_blank" rel="noopener noreferrer nofollow" href="https://slack.com/">general channel</a> on Slack channel and introduce yourself.</p></li><li><p><strong>Technical Onboarding:</strong> Dive into hands-on technical sessions to familiarize yourself with our development stack and best practices. <a target="_blank" rel="noopener noreferrer nofollow" href="/demo?nodeId=1">Check the Technical Ticket</a> to get more info.</p></li><li><p><strong>Meet and Greet:</strong> Attend virtual meet-and-greet sessions to get to know your colleagues across departments. Contact human resources manager <a target="_blank" rel="noopener noreferrer nofollow" href="mailto:john-doe@gmail.com">john-doe@gmail.com</a> to get more info about that.</p></li><li><p><strong>Company History and Future Roadmap:</strong> Learn about <a target="_blank" rel="noopener noreferrer nofollow" href="https://vercel.com/blog">Verceel's journey</a> so far and where we are headed in the future.</p></li><li><p><strong>Feedback Session:</strong> We value your feedback. Participate in sessions where you can share your thoughts on the on-boarding process and suggest improvements send us your feedback <a target="_blank" rel="noopener noreferrer nofollow" href="https://vercel.com/contact">here</a>.</p></li></ol><p>Welcome to Veercel! We're excited to embark on this journey with you. If you have any questions or need assistance, don't hesitate to reach out to your onboarding buddy <a target="_blank" rel="noopener noreferrer nofollow" href="mailto:john-doe@gmail.com">john-doe@gmail.com</a> or the HR team. Together, let's build the future of web development!</p>`,
      tags: ["welcome", "on-boarding"],
      type: "input",
    },
  },
  {
    id: "1",
    type: "ticket",
    position: { x: -250, y: 400 },
    data: {
      title: "Introduction to teams 🤗",
      description: `<p>During the Team Introductions step of your onboarding journey, you'll have the opportunity to connect with the amazing individuals who make up the Vercel family. Meet key personnel, fellow team members, and even get acquainted with other talented new hires. These introductions go beyond names and titles – they're an invitation to build lasting connections that foster collaboration and teamwork.</p><p>Head over to the <a target="_blank" rel="noopener noreferrer nofollow" href="https://slack.com/">#dev-channel</a>, where our developers share insights, discuss exciting projects, and support each other in the journey of continuous learning. We look forward to seeing you there!</p>`,
      tags: ["teams"],
      type: "normal",
    },
  },
  {
    id: "2",
    type: "ticket",
    position: { x: 550, y: 400 },
    data: {
      title: "Technical On-Boarding 💻",
      description: `<h2>Overview</h2><p>Welcome to the technical on-boarding phase! Get ready to dive into the tools that power our development process. The below list contains the tools to start, follow the next :</p><ul><li><p><strong>Github:</strong> The version control system we use. Join the Veercel's organization on <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/">github</a>, check the guide <a target="_blank" rel="noopener noreferrer nofollow" href="/demo?nodeId=3">here</a>.</p></li><li><p><strong>Asana:</strong> For the tasks management. <a target="_blank" rel="noopener noreferrer nofollow" href="https://app.asana.com/">Sign In/Up</a> and join our organization.</p></li><li><p><strong>Sentry:</strong> We use <a target="_blank" rel="noopener noreferrer nofollow" href="https://sentry.io/">Sentry</a> to track errors on our current projects register yourself and ask for access to the one assigned to you.</p></li><li><p><strong>Vault:</strong> We use <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.vaultproject.io/">vault</a> for secrets management. Ask for these credentials access to <a target="_blank" rel="noopener noreferrer nofollow" href="mailto:john-doe@gmail.com">john-doe@gmail.com</a>.</p></li></ul><p>In case of any doubt remember to contact <a target="_blank" rel="noopener noreferrer nofollow" href="mailto:john-doe@gmail.com">john-doe@gmail.com</a>, your advisor during this process. These tools are the backbone of our collaborative and efficient workflow, ensuring seamless development and delivery. Let's build exceptional products together 💪!</p>`,
      tags: ["technical"],
      type: "normal",
    },
  },
  {
    id: "3",
    type: "ticket",
    position: { x: 200, y: 700 },
    data: {
      title: "Github Set-Up",
      description: `<p>Follow these <a target="_blank" rel="noopener noreferrer nofollow" href="https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization">steps</a> to join our organization.</p>`,
      tags: ["technical"],
      type: "normal",
    },
  },
  {
    id: "4",
    type: "ticket",
    position: { x: 600, y: 700 },
    data: {
      title: "Asana Set-Up",
      description: `<p>Hey engineers, for tracking tasks and requests, we use <a target="_blank" rel="noopener noreferrer nofollow" href="https://asana.com/">Asana</a>. Think of it as our main <strong>to-do list</strong> for the whole company. You'll get assigned tickets whenever someone needs your expertise, like bug fixes, feature requests, or code reviews. Just jump in, grab the tickets, and let's get stuff done! We have <a target="_blank" rel="noopener noreferrer nofollow" href="https://help.asana.com/hc/en-us/articles/14250783001627-How-to-start-using-Asana">guides and tips</a> to help you navigate, so don't worry if it's new. </p><p>Remember, clear communication is key, so keep your updates on the tickets and ask questions if anything's unclear. Let's work together to crush those tickets and ship awesome tech 😄!</p>`,
      tags: ["technical"],
      type: "normal",
    },
  },
  {
    id: "5",
    type: "ticket",
    position: { x: 1000, y: 700 },
    data: {
      title: "Credentials (Vault) Set-Up",
      description: `<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.vaultproject.io/">Vault</a> is our secure credential management system. It stores sensitive credentials (Database credentials, API keys, etc...) encrypted. Controlling access with policies and providing time-limited, dynamic access tokens.</p><p>First, install the Vault CLI on your local machine. This allows convenient access to request tokens and secrets through the command line. The install process is simple - just follow our onboarding docs.</p><p>Next, you'll need to authenticate with Vault before being able to access any credentials. Our default authentication method uses your corporate LDAP credentials. Just run:</p><pre><code>vault login -method=ldap username=my_username</code></pre><p>This will prompt you for your LDAP password and log you in. Vault now knows your identity!</p><p>The final step is having privileged credentials associated with your user/machines. We organize Vault policies by application and environment. To gain access, have your manager file a request for the proper policy assignment.</p><p>Once approved, you can start interfacing with Vault right away to manage infrastructure secrets, API keys, DB creds, and more! Try accessing a secret:</p><pre><code>vault read secret/my-app/prod/db-password</code></pre><p>As new engineers get up to speed, leverage Vault as much as possible to minimize security risks. Reach out to <a target="_blank" rel="noopener noreferrer nofollow" href="https://slack.com/">#security</a> or <a target="_blank" rel="noopener noreferrer nofollow" href="https://slack.com/">#vault </a>in Slack if you have any setup questions!</p>`,
      tags: ["technical"],
      type: "normal",
    },
  },
  {
    id: "6",
    type: "ticket",
    position: { x: 0, y: 1200 },

    data: {
      title: "Benefits 💛",
      description: `<h1>Benefits Overview </h1><p>We offer a robust benefits program to support your health, financial wellness, career growth and positive work/life balance here at Veercel. Please read below for an overview of what is available to software engineering team members.</p><h2>Paid Time Off:</h2><ul><li><p>15 vacation days, 5 sick days and 10 company holidays to start</p></li><li><p>Vacation increases to 20 days after 2 years of service</p></li></ul><h2>Salary and Raises:</h2><ul><li><p>Competitive market-rate base salaries</p></li><li><p>Annual cost of living raises company-wide</p></li><li><p>Performance raises after each annual review cycle</p></li></ul><h2>Health Insurance:</h2><ul><li><p>Comprehensive medical, dental and vision coverage</p></li><li><p>75% premiums covered by Veercel</p></li><li><p>Wellness reimbursement programs</p></li></ul><h2>Extra Perks and Discounts:</h2><ul><li><p>Free daily lunches and snacks</p></li><li><p>Gym membership reimbursement</p></li><li><p>Professional development budget</p></li><li><p>Product subscription discounts (AWS, Netflix etc.)</p></li></ul><h2>Career Growth:</h2><ul><li><p>Technical skill development training</p></li><li><p>Management coaching tracks</p></li><li><p>Internal transfer / stretch assignment opportunities</p></li></ul><p>If you have any clarifying questions around the benefits program or what coverage works best for your situation, our dedicated HR team is always available to help explain specifics. Please let me know how I can assist further in your on-boarding process!</p>`,
      tags: ["benefits", "policies"],
      type: "normal",
    },
  },
  {
    id: "7",
    type: "ticket",
    position: { x: -450, y: 1500 },
    data: {
      title: "Paid Time Off Policy 🏖",
      description: `<h2><strong>Paid Time Off (PTO) Policy 🏖</strong></h2><p>All full-time employees are eligible to accrue PTO based on their length of service at the company.</p><h4>Accrual Rate ⏱</h4><ul><li><p>First year: 15 days per year</p></li><li><p>After 2 years: 20 days per year 🆙</p></li><li><p>PTO accrues each pay period at a rate in line with targets above</p></li></ul><h4>Usage 🛫</h4><ul><li><p>PTO can be taken at the employee's discretion with manager approval 👍</p></li><li><p>Approval will not be unreasonably withheld as long as project coverage is maintained</p></li><li><p>PTO is expected to be taken within the year accrued 🗓</p></li><li><p>Maximum rollover of 5 unused days year to year</p></li></ul><h4>Request Process 📝</h4><p>Employees should request PTO through the HR system at least 2 weeks before intended start date. Approvals will be returned within 5 business days.</p><h4>Payment at Termination 💸</h4><p>Accrued unused PTO will be paid out in the case of voluntary or involuntary termination based on state law.</p><p>Please reach out to your HR Business Partner with any clarifying questions on the Paid Time Off policies. We aim to provide flexibility while balancing business needs. 🤝</p>`,
      tags: ["benefits", "policies"],
      type: "normal",
    },
  },
  {
    id: "8",
    type: "ticket",
    position: { x: 0, y: 1500 },
    data: {
      title: "Health Insurance Policy 💊",
      description: `<h2><strong>Health Insurance 💊</strong></h2><p>Our company offers comprehensive health insurance to protect both you and your family.</p><h4>Coverage Options ✌️</h4><p>Employees can choose between our High Deductible 💸 (HDHP) plan and our Preferred Provider Organization (PPO) plan. Details on coverage, deductibles, and premium splits available in Appendix A.</p><h4>Eligibility 🙋‍♀️</h4><ul><li><p>Full-time employees (&gt;30 hrs/week) eligible on first of the month after start date</p></li><li><p>Enrollment window offered each year during open enrollment or life event 🗓</p></li></ul><h4>Premium Contributions 💰</h4><ul><li><p>Company covers 75% of total medical premiums</p></li><li><p>Employee contributes remaining 25% via payroll deductions</p></li></ul><h4>Included Benefits ✅</h4><ul><li><p>Annual check-ups and preventative care covered at no cost 🆓</p></li><li><p>Pharmacy prescriptions included in medical deductible 💊</p></li><li><p>Vision and dental coverage for additional premium 👓</p></li></ul><p>Please reach out to HR to discuss specific plan details as needed. Adding dependents or evaluating different tiers of coverage can impact premium splits and total deductions from your paycheck, so individual consultation is recommended. HR can provide guidance on choosing the optimal coverage for your personal situation each enrollment cycle. Reach out with any other Health Plan questions! 🤗</p>`,
      tags: ["benefits", "policies"],
      type: "normal",
    },
  },
  {
    id: "9",
    type: "ticket",
    position: { x: 450, y: 1500 },
    data: {
      title: "Extra Benefits Policy 😊",
      description: `<h2><strong>Extra Benefits 😊</strong></h2><p>We provide the following additional perks beyond standard compensation and benefits packages to promote work-life balance, ongoing learning, and employee happiness.</p><h4>Food and Entertainment 🍕🎞️</h4><ul><li><p>Catered lunches and fully stocked kitchens available each day</p></li><li><p>Snack stations on each floor 🥨🧃</p></li><li><p>Company movie nights and game nights 🎮🍿</p></li></ul><h4>Health and Wellness ⛹️‍♀️💆‍♂️</h4><ul><li><p>Onsite gym and workout classes 🏋️</p></li><li><p>Allowance for external fitness club memberships 💸</p></li><li><p>Mindfulness seminars and yoga 🧘‍♀️</p></li></ul><h4>Growth and Learning 📚</h4><ul><li><p>Annual conference participation budget 💰</p></li><li><p>Access to large e-book/audiobook library 📚</p></li><li><p>Educational seminars and skill-building workshops 👩‍💻</p></li></ul><p>We're always looking for new and creative ways to invest in employee happiness and success at work and in life. Reach out if you have ideas for improvements! ✨</p>`,
      tags: ["benefits", "policies"],
      type: "normal",
    },
  },
  {
    id: "10",
    type: "ticket",
    position: { x: 0, y: 1800 },
    data: {
      title: "Feedback 🙏",
      description: `<h2><strong>Provide Feedback to Improve Onboarding 📝</strong></h2><p>As you wrap up your onboarding journey, we would greatly appreciate your feedback to help us continually improve. ✨</p><p>🙌 Please take 5-10 minutes to fill out our onboarding survey and share your experience at:</p><p><a target="_blank" rel="noopener noreferrer nofollow" href="http://company.net/onboarding-feedback"><strong>company.net/onboarding-feedback</strong></a></p><p>🧐 Your insights will help identify what is going well and areas needing adjustment, such as:</p><ul><li><p>Onboarding content and sequencing</p></li><li><p>Enabling productivity and impact</p></li><li><p>Manager involvement and support</p></li><li><p>Helpfulness of systems access and setup</p></li></ul><p>🎯 Our goal is to optimize the experience for all new hires. We value submissions within your first 30 days while the journey is still fresh!</p><p>😄 As a small token of thanks for complete surveys, we will enter respondents into a raffle for a $100 Amazon gift card.</p><p>We eagerly look forward to hearing your story and using that wisdom to level up onboarding at our organization. Your feedback makes a difference! ✅</p>`,
      tags: ["feedback", "recommendations"],
      type: "normal",
    },
  },
];
