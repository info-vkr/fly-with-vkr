import ServiceDetailTemplate from "../components/ServiceDetailTemplate";

export default function BusBookingPage() {
  return (
    <ServiceDetailTemplate
      title="Bus Booking"
      heroImage="/assets/bus-booking-banner.jpg"
      contentImage="/assets/services/bus-booking.webp"
      description="Your journey across Sri Lanka made simple — book safe, comfortable buses with guaranteed seats and instant confirmations."
      highlights={[
        "Nationwide routes with luxury and semi-luxury options",
        "Seat selection and live tracking for convenience",
        "Instant e-tickets via SMS or email",
        "24/7 customer support and flexible rebooking",
      ]}
    />
  );
}
