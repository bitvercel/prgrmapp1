import { ProjectDetails } from "@/components/project/project-details";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

// This is required for static site generation with `output: export`
export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" }
  ];
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // In a real app, you would fetch this data from an API
  const projects = {
    "1": {
      id: "1",
      title: "Tech Empowerment for At-Risk Girls",
      description: "A program aimed at empowering girls through technical training and education to combat human trafficking and create opportunities for a better future.",
    },
    "2": {
      id: "2",
      title: "Digital Safety Workshop Series",
      description: "Workshop series teaching online safety, digital literacy, and cybersecurity awareness",
    },
    "3": {
      id: "3",
      title: "Community Outreach Initiative",
      description: "Engaging local communities to build awareness and support networks",
    }
  };

  const project = projects[params.id as keyof typeof projects];
  if (!project) return null;

  return <ProjectDetails project={project} />;
}