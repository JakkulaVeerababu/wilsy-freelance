export const studio = {
  name: "Wilsy",
  email: "contact@wilsy.in",
  whatsapp: "",
  social: [] as { label: string; url: string }[],
  founder: "",
  team: "",
  location: "",
  background:
    "An independent web development and digital product studio. We bring thoughtful design and reliable engineering together to help ambitious businesses take their next step.",
};

export const services = [
  {
    id: "custom-website",
    name: "Custom websites",
    fullName: "Custom Website Design & Development",
    description:
      "A distinctive home for your brand. Designed around your story, built around your business.",
    tags: ["UI / UX design", "Development", "Responsive design"],
  },
  {
    id: "business",
    name: "Business & corporate",
    fullName: "Business & Corporate Websites",
    description:
      "Make a clear first impression with a website that gives your company room to grow.",
    tags: ["Brand websites", "CMS", "Content strategy"],
  },
  {
    id: "ecommerce",
    name: "E-commerce experiences",
    fullName: "E-commerce Development",
    description:
      "Turn browsing into a considered buying journey, from the first product view to checkout.",
    tags: ["Storefronts", "Product discovery", "Checkout"],
  },
  {
    id: "web-app",
    name: "Digital products & SaaS",
    fullName: "SaaS & Web Applications",
    description:
      "Make complex ideas feel simple with intuitive interfaces and dependable engineering.",
    tags: ["Web applications", "Dashboards", "Design systems"],
  },
  {
    id: "ai",
    name: "AI-powered solutions",
    fullName: "AI-Powered Web Solutions",
    description:
      "Useful intelligence, thoughtfully integrated. Bring automation and smarter workflows into your product.",
    tags: ["Integrations", "Automation", "Custom workflows"],
  },
  {
    id: "redesign",
    name: "Redesign & optimization",
    fullName: "Website Redesign & Optimization",
    description:
      "Give your existing website a new perspective, with better usability and a stronger technical foundation.",
    tags: ["UX audits", "Performance", "Technical SEO"],
  },
  {
    id: "support",
    name: "Care & ongoing support",
    fullName: "Maintenance & Ongoing Support",
    description:
      "Keep moving after launch with practical improvements, maintenance, and a clear support plan.",
    tags: ["Maintenance", "Updates", "Ongoing development"],
  },
] as const;

export const projects = [
  {
    slug: "forma",
    name: "Forma",
    type: "Architecture & interiors",
    category: "Brand website",
    theme: "forma",
    headline: "Space for a different perspective.",
    summary:
      "An editorial website concept for an architecture practice. Restrained typography, expressive space, and a considered project browsing experience.",
    challenge:
      "Let architectural work lead while making the practice, its approach, and the next step easy to find.",
    approach:
      "An image-led layout, a clear project index, and a deliberately quiet interface give each space room to speak.",
    demonstrates:
      "Responsive editorial layouts, a considered type system, and image-led storytelling.",
    technologies: ["Next.js", "TypeScript", "Responsive CSS"],
    deliverables: [
      "Visual direction",
      "Responsive website concept",
      "Project browsing interface",
    ],
    outcomes:
      "An interactive design exploration. No client engagement, launch metrics, or business results are claimed.",
    sample: true,
    liveUrl: "/concepts/forma",
  },
  {
    slug: "orbit",
    name: "Orbit",
    type: "Finance workspace",
    category: "Digital product",
    theme: "orbit",
    headline: "A clearer view of the everyday.",
    summary:
      "A product interface concept that turns everyday financial information into a calm, navigable workspace.",
    challenge:
      "Create hierarchy in a data-rich interface without making everyday tasks feel complex.",
    approach:
      "A focused navigation system, clear account summaries, and deliberate data visualization put useful information first.",
    demonstrates:
      "Dashboard hierarchy, illustrative data visualization, and a reusable product UI across screen sizes.",
    technologies: ["React", "TypeScript", "Design system"],
    deliverables: [
      "Product UI direction",
      "Dashboard prototype",
      "Responsive component system",
    ],
    outcomes:
      "An interactive interface prototype with illustrative data. No live financial services or verified outcomes are represented.",
    sample: true,
    liveUrl: "/concepts/orbit",
  },
] as const;

export const process = [
  {
    name: "Discover",
    description:
      "First, the right questions. We get to know your business, your audience, and what a meaningful result looks like.",
    output: "A shared understanding",
  },
  {
    name: "Strategize",
    description:
      "We map the scope, content, architecture, and priorities into a clear plan with agreed milestones.",
    output: "Your project roadmap",
  },
  {
    name: "Design",
    description:
      "Your vision takes shape through visual direction, intuitive journeys, and responsive designs you can review.",
    output: "An experience with intention",
  },
  {
    name: "Develop",
    description:
      "We turn the approved design into a working website or product with maintainable code and regular progress reviews.",
    output: "Built to work beautifully",
  },
  {
    name: "Test & launch",
    description:
      "We check functionality, accessibility, responsiveness, and performance before preparing your release.",
    output: "A considered launch",
  },
  {
    name: "Support",
    description:
      "We hand over documentation and agree on the maintenance and improvements your next chapter needs.",
    output: "Room to keep growing",
  },
];

export const packages = [
  {
    name: "A stronger presence",
    audience: "For brands ready for their next chapter.",
    timing: "2–4 weeks",
    timingLabel: "Typical timeline",
    delivery: "Timing confirmed once pages, content, and integrations are scoped.",
    features: [
      "Custom website design",
      "Responsive development",
      "Content & SEO foundations",
      "Launch guidance",
    ],
    service: "custom-website",
  },
  {
    name: "A bigger possibility",
    audience: "For ideas that need more than a website.",
    timing: "4–8 weeks",
    timingLabel: "Typical timeline",
    delivery: "A milestone plan follows discovery and technical scoping.",
    features: [
      "Product strategy & UX",
      "Custom web application",
      "Integrations & workflows",
      "Testing & documentation",
    ],
    service: "web-app",
  },
  {
    name: "A lasting partnership",
    audience: "For businesses that want to keep moving.",
    timing: "Ongoing",
    timingLabel: "Monthly support",
    delivery: "A clear monthly scope keeps priorities and capacity visible.",
    features: [
      "Website maintenance",
      "Performance improvements",
      "Design & feature updates",
      "Agreed support plan",
    ],
    service: "support",
  },
];
