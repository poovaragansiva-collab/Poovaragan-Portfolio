import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import ExpertiseSection from "@/components/expertise/ExpertiseSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ServicesSection from "@/components/services/ServicesSection";
import AILabSection from "@/components/ai-lab/AILabSection";
import WritingSection from "@/components/writing/WritingSection";
import AIAssistantSection from "@/components/ai-assistant-showcase/AIAssistantSection";
import ResumeSection from "@/components/resume/ResumeSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ProjectsSection />
      <ServicesSection />
      <AILabSection />
      <WritingSection />
      <AIAssistantSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
