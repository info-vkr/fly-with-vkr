import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

export default function HotelReservationPage() {
  return (
    <ServiceDetailTemplate
      title="Hotel Reservation"
      heroImage="/assets/hotel-reservation-banner.jpg"
      contentImage="/assets/services/hotel-reservation.jpg"
      description="Stay in comfort wherever you go. We offer exclusive hotel deals — from cozy stays to luxury resorts worldwide."
      highlights={[
        "Partnered with over 10,000 hotels globally",
        "Flexible booking with instant confirmation",
        "Special discounts and package deals for families",
        "Verified properties with real guest reviews",
      ]}
    />
  );
}
