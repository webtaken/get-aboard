import { v4 as uuidv4 } from "uuid";
import { Node } from "reactflow";
import { Content } from "@tiptap/react";

export interface DataTicketNode {
  title: string;
  description: Content;
  tags?: string[];
  type: "input" | "normal";
}

export const initialNodes: Node<DataTicketNode>[] = [
  {
    // id: uuidv4(),
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
      tags: ["setup"],
      type: "normal",
    },
  },
  {
    id: "2",
    type: "ticket",
    position: { x: 350, y: 400 },
    data: {
      title: "Technical On-Boarding",
      description: `<h2>Overview</h2><p>Welcome to the technical on-boarding phase! Get ready to dive into the tools that power our development process. The below list contains the tools to start, follow the next :</p><ul><li><p><strong>Github:</strong> The version control system we use. Join the Veercel's organization on <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/">github</a>, check the guide <a target="_blank" rel="noopener noreferrer nofollow" href="/demo?nodeId=3">here</a>.</p></li><li><p><strong>Asana:</strong> For the tasks management. <a target="_blank" rel="noopener noreferrer nofollow" href="https://app.asana.com/">Sign In/Up</a> and join our organization.</p></li><li><p><strong>Sentry:</strong> We use <a target="_blank" rel="noopener noreferrer nofollow" href="https://sentry.io/">Sentry</a> to track errors on our current projects register yourself and ask for access to the one assigned to you.</p></li><li><p><strong>Vault:</strong> We use <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.vaultproject.io/">vault</a> for secrets management. Ask for these credentials access to <a target="_blank" rel="noopener noreferrer nofollow" href="mailto:john-doe@gmail.com">john-doe@gmail.com</a>.</p></li></ul><p>In case of any doubt remember to contact <a target="_blank" rel="noopener noreferrer nofollow" href="mailto:john-doe@gmail.com">john-doe@gmail.com</a>, your advisor during this process. These tools are the backbone of our collaborative and efficient workflow, ensuring seamless development and delivery. Let's build exceptional products together 💪!</p>`,
      tags: ["technical"],
      type: "normal",
    },
  },
  {
    id: "3",
    type: "ticket",
    position: { x: 0, y: 700 },
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
    position: { x: 500, y: 700 },
    data: {
      title: "Asana Set-Up",
      description: `<p>Follow these <a target="_blank" rel="noopener noreferrer nofollow" href="https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization">steps</a> to join our organization.</p>`,
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
      description: `<p>Follow these <a target="_blank" rel="noopener noreferrer nofollow" href="https://docs.github.com/en/organizations/managing-membership-in-your-organization/inviting-users-to-join-your-organization">steps</a> to join our organization.</p>`,
      tags: ["technical"],
      type: "normal",
    },
  },
];
