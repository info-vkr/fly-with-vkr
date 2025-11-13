import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

export default function VisaConsultationPage() {
  return (
    <ServiceDetailTemplate
      title="Visa Consultation"
      heroImage="/assets/visa-consultation-banner.jpg"
      contentImage="/assets/services/visa-consultant.webp"
      description="Expert visa guidance for all destinations — we handle every step of your application with precision, care, and personalized support."
      highlights={[
        "Comprehensive assistance for tourist, student, and work visas",
        "Accurate documentation to avoid rejections",
        "Dedicated case officers for personalized service",
        "Real-time tracking and updates on your visa progress",
      ]}
    />
  );
}
