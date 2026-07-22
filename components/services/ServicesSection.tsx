"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { services, Service } from "@/lib/data/services";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ServiceCard from "./ServiceCard";
import QuoteRequestDialog from "./QuoteRequestDialog";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <SectionWrapper
      id="services"
      eyebrow="Services"
      title="How I can help"
      description="From a single automation to a full backend build — services designed to plug into what you already have."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onRequestQuote={setActiveService} />
        ))}
      </motion.div>

      <QuoteRequestDialog
        service={activeService}
        onClose={() => setActiveService(null)}
      />
    </SectionWrapper>
  );
}
