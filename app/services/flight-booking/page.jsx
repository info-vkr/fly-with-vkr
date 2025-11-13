import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

export default function FlightBookingPage() {
  return (
    <ServiceDetailTemplate
      title="Flight Booking"
      heroImage="/assets/flight-booking-banner.jpg"
      contentImage="/assets/services/flight-booking.jpg"
      description="Book domestic or international flights effortlessly. We compare the best deals, secure low fares, and provide instant confirmations to make your travel stress-free."
      highlights={[
        "Compare hundreds of airlines for the best price",
        "Instant e-ticket generation and real-time updates",
        "24/7 support for reschedules and cancellations",
        "Flexible options for one-way, round-trip, and multi-city routes",
      ]}
    />
  );
}
