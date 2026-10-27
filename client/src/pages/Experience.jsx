import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Car,
  ChefHat,
  Clock,
  Compass,
  Flower2,
  Heart,
  LayoutGrid,
  Star,
  Ticket,
  UserRound,
  Utensils,
} from "lucide-react";
import offerImg1 from "../assets/exclusiveOfferCardImg1.png";
import offerImg2 from "../assets/exclusiveOfferCardImg2.png";
import offerImg3 from "../assets/exclusiveOfferCardImg3.png";

// One soft tint per category keeps the page light while telling cards apart
const THEMES = {
  adventure: { icon: Compass, tile: "bg-orange-50 text-orange-600" },
  wellness: { icon: Flower2, tile: "bg-emerald-50 text-emerald-600" },
  dining: { icon: Utensils, tile: "bg-amber-50 text-amber-600" },
  culinary: { icon: ChefHat, tile: "bg-rose-50 text-rose-600" },
  romance: { icon: Heart, tile: "bg-pink-50 text-pink-600" },
  business: { icon: Briefcase, tile: "bg-sky-50 text-sky-600" },
};

const categories = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "adventure", label: "Adventure", icon: Compass },
  { id: "wellness", label: "Wellness", icon: Flower2 },
  { id: "dining", label: "Dining", icon: Utensils },
  { id: "romance", label: "Romance", icon: Heart },
  { id: "business", label: "Business", icon: Briefcase },
];

const experiences = [
  {
    iconKey: "adventure", category: "adventure",
    title: "Adventure Tours",
    description: "Breathtaking landscapes and thrilling adventures with expert guides.",
    features: ["Mountain Trekking", "Desert Safari", "Water Sports", "Wildlife Tours"],
    price: "From $299", duration: "Half-day to multi-day", rating: 4.9,
  },
  {
    iconKey: "wellness", category: "wellness",
    title: "Luxury Spa & Wellness",
    description: "Rejuvenate mind and body with world-class spa treatments.",
    features: ["Massage Therapy", "Yoga Sessions", "Meditation", "Thermal Baths"],
    price: "From $149", duration: "2–4 hours", rating: 4.8,
  },
  {
    iconKey: "dining", category: "dining",
    title: "Fine Dining",
    description: "Exquisite cuisine prepared by renowned chefs in elegant settings.",
    features: ["Michelin Star Chefs", "Wine Tasting", "Private Dining", "Chef's Table"],
    price: "From $199", duration: "2–3 hours", rating: 4.9,
  },
  {
    iconKey: "business", category: "business",
    title: "Business Facilities",
    description: "State-of-the-art meeting rooms and business centers.",
    features: ["Conference Rooms", "High-Speed WiFi", "Tech Support", "Catering"],
    price: "From $99", duration: "Half-day to full-day", rating: 4.7,
  },
  {
    iconKey: "culinary", category: "dining",
    title: "Culinary Experiences",
    description: "Cooking classes and food tours to discover local flavors.",
    features: ["Cooking Classes", "Food Tours", "Market Visits", "Recipe Books"],
    price: "From $129", duration: "3–5 hours", rating: 4.8,
  },
  {
    iconKey: "romance", category: "romance",
    title: "Romantic Getaways",
    description: "Unforgettable memories with specially designed romantic packages.",
    features: ["Candlelit Dinners", "Couple Spa", "Sunset Cruises", "Photography"],
    price: "From $399", duration: "Full-day to weekend", rating: 5.0,
  },
];

const packages = [
  {
    image: offerImg1, title: "Exclusive Beach Resort",
    description: "Private beach access with water sports and sunset dining.",
    duration: "3 days · 2 nights", price: "From $1,299", rating: 4.9,
  },
  {
    image: offerImg2, title: "Mountain Retreat & Wellness",
    description: "Yoga, meditation, and spa treatments in serene mountains.",
    duration: "5 days · 4 nights", price: "From $1,599", rating: 4.8,
  },
  {
    image: offerImg3, title: "Cultural Heritage Tour",
    description: "Explore ancient sites with expert guides and local cuisine.",
    duration: "7 days · 6 nights", price: "From $2,199", rating: 4.9,
  },
];

const vipPerks = [
  { title: "Private butler", desc: "Dedicated personal service throughout your stay", icon: UserRound },
  { title: "Luxury transport", desc: "Airport transfers and a premium vehicle fleet", icon: Car },
  { title: "Exclusive access", desc: "VIP events, venues and private tours", icon: Ticket },
];

const testimonials = [
  { name: "Sarah Johnson", location: "New York, USA", comment: "The adventure tour was absolutely incredible! Every detail was perfectly planned and the guides were exceptional.", experience: "Mountain Trekking" },
  { name: "Michael Chen", location: "Singapore", comment: "The spa experience was divine. I felt completely refreshed after my stay. The therapists were highly skilled.", experience: "Luxury Spa Package" },
  { name: "Emma Williams", location: "London, UK", comment: "The culinary experience exceeded all expectations. Learning from a Michelin-star chef was a dream come true.", experience: "Chef's Cooking Class" },
];

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

const SectionHeading = ({ title, subtitle, action }) => (
  <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
    <div className="max-w-2xl">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-500">{subtitle}</p>}
    </div>
    {action}
  </div>
);

const Experience = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filtered =
    activeTab === "all" ? experiences : experiences.filter((e) => e.category === activeTab);

  const goToHotels = () => {
    navigate("/rooms");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-24">
        {/* ── Hero ── */}
        <section className="mb-12">
          <p className="text-sm font-semibold text-gray-500 mb-4">Experiences</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.1] mb-4 max-w-3xl">
            Make your stay more than a place to sleep.
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Hand-picked activities, dining and wellness — added to your trip by the hotels you love.
          </p>
        </section>

        {/* ── Categories ── */}
        <div className="flex gap-8 overflow-x-auto border-b border-gray-200 mb-10 [scrollbar-width:none]" role="tablist">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => setActiveTab(id)}
              className={`relative flex flex-col items-center gap-2 pb-3 shrink-0 text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === id ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={1.5} />
              {label}
              <span
                className={`absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-gray-900 transition-transform ${
                  activeTab === id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* ── Experience cards ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {filtered.map((exp) => {
            const theme = THEMES[exp.iconKey];
            const Icon = theme.icon;
            return (
              <article
                key={exp.title}
                className="group flex flex-col rounded-2xl border border-gray-200 p-6 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className={`flex items-center justify-center w-12 h-12 rounded-xl ${theme.tile}`}>
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-gray-900">
                    <Star className="w-4 h-4 fill-gray-900" />
                    {exp.rating.toFixed(1)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">{exp.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{exp.description}</p>

                <ul className="flex flex-wrap gap-2 mb-5">
                  {exp.features.slice(0, 3).map((f) => (
                    <li key={f} className="px-2.5 py-1 rounded-full border border-gray-200 text-xs text-gray-600">
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex-1" />

                <div className="flex items-end justify-between gap-3 pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-900">{exp.price}</p>
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {exp.duration}
                    </p>
                  </div>
                  <button
                    onClick={goToHotels}
                    className="px-4 py-2 rounded-lg border border-gray-900 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        {/* ── Signature packages ── */}
        <section className="mb-24">
          <SectionHeading
            title="Signature packages"
            subtitle="Multi-day getaways that bundle the best experiences together."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((p) => (
              <button key={p.title} onClick={goToHotels} className="group text-left cursor-pointer">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                  <span className="flex items-center gap-1 text-sm text-gray-900 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-gray-900" />
                    {p.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{p.description}</p>
                <p className="text-sm text-gray-500">{p.duration}</p>
                <p className="mt-1.5 text-sm">
                  <span className="font-semibold text-gray-900">{p.price}</span>{" "}
                  <span className="text-gray-500">per person</span>
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* ── VIP ── */}
        <section className="rounded-3xl bg-gray-50 border border-gray-100 p-8 md:p-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-3">Premium package</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">The VIP experience</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Private tours, a personal concierge, luxury transportation and access to exclusive
                venues and events — all arranged for you.
              </p>
              <button
                onClick={goToHotels}
                className="px-6 py-3 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Find a VIP stay
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {vipPerks.map(({ title, desc, icon: Icon }) => (
                <div key={title} className="rounded-2xl bg-white border border-gray-200 p-5">
                  <Icon className="w-7 h-7 text-gray-900 mb-4" strokeWidth={1.5} />
                  <p className="font-semibold text-gray-900 mb-1">{title}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="mb-24">
          <SectionHeading title="What guests say" subtitle="Stories from travelers who tried our experiences." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col">
                <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gray-900 text-gray-900" />
                  ))}
                </div>
                <blockquote className="flex-1 text-gray-700 leading-relaxed mb-5">“{t.comment}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-sm text-gray-500">
                      {t.location} · {t.experience}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="rounded-3xl border border-gray-200 px-8 py-12 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Start planning your trip</h2>
            <p className="text-gray-500">Book a hotel first, then add the experiences that make it yours.</p>
          </div>
          <button
            onClick={goToHotels}
            className="shrink-0 px-6 py-3 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Browse hotels
          </button>
        </section>
      </div>
    </div>
  );
};

export default Experience;
