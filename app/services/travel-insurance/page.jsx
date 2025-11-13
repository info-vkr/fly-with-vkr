import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

export default function TravelInsurancePage() {
  return (
    <ServiceDetailTemplate
      title="Travel Insurance"
      heroImage="/assets/travel-insurance-banner.jpeg"
      contentImage="/assets/services/travel-insurance.jpg"
      description="Travel with peace of mind. Our insurance covers you from unexpected events — from flight delays to medical emergencies abroad."
      highlights={[
        "Comprehensive global coverage at affordable rates",
        "Fast claims and emergency medical assistance",
        "Protection for lost luggage and cancellations",
        "Ideal for frequent travelers, students, and families",
      ]}
    />
  );
}
