import React from "react";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  cta: { label: string; href: string };
};

const EVENTS: Event[] = [
  {
    id: "1",
    title: "Event 1",
    date: "Date",
    location: "SRMIST Ramapuram",
    description:
      "Event Description",
    image: "",
    cta: { label: "Register Now", href: "#" },
  },
  {
    id: "2",
    title: "Event 2",
    date: "Date",
    location: "Online",
    description:
      "Event Description",
    image: "",
    cta: { label: "Join Now", href: "#" },
  },
  {
    id: "3",
    title: "Event 3",
    date: "Date",
    location: "TRP Auditorium Hall",
    description:
      "Event Description",
    image: "",
    cta: { label: "Reserve Seat", href: "#" },
  },
];

export default function EventsPage() {
  return (
    <main className="bg-white min-h-screen py-12 px-4 sm:px-8 lg:px-16">
      <header className="max-w-6xl mx-auto mb-8">
        <h1
          className="text-3xl sm:text-4xl font-bold"
          style={{ color: "#080808", fontFamily: "Cy Grotesk Grand, sans-serif" }}
        >
          Codezilla Events
        </h1>
        <p
          className="mt-2 text-lg"
          style={{ color: "#020202", fontFamily: "TT Hoves, sans-serif" }}
        >
          Stay up-to-date with upcoming workshops, hackathons, and tech talks.
        </p>
      </header>

      <section className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map((event) => (
          <article
            key={event.id}
            className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h2
                  className="text-xl font-semibold mb-1"
                  style={{ color: "#080808", fontFamily: "Cy Grotesk Grand, sans-serif" }}
                >
                  {event.title}
                </h2>
                <p
                  className="text-sm mb-2"
                  style={{ color: "#020202", fontFamily: "TT Hoves, sans-serif" }}
                >
                  {event.date} • {event.location}
                </p>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
              <a
                href={event.cta.href}
                className="mt-4 inline-block text-center px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: "#DE5D26",
                  color: "white",
                  fontFamily: "TT Hoves, sans-serif",
                }}
              >
                {event.cta.label}
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
