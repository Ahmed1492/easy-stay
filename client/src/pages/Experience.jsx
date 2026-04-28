
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageSkeleton } from "../components/SkeletonLoader";

const Experience = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const categories = [
    { id: "all",       label: "All" },
    { id: "adventure", label: "Adventure" },
    { id: "wellness",  label: "Wellness" },
    { id: "dining",    label: "Dining" },
    { id: "romance",   label: "Romance" },
    { id: "business",  label: "Business" },
  ];

  // Clean, recognisable SVG icons per category
  const icons = {
    // Compass rose → adventure / exploration
    adventure: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={1.5}/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>
      </svg>
    ),
    // Leaf / lotus → wellness / spa
    wellness: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22c0 0-8-4-8-11a8 8 0 0116 0c0 7-8 11-8 11z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22V11"/>
      </svg>
    ),
    // Cloche / dome → fine dining
    dining: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17h18M12 3C7 3 3 7.5 3 12h18c0-4.5-4-9-9-9z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2"/>
      </svg>
    ),
    // Chef hat → culinary
    culinary: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18h12M6 18v-2a6 6 0 016-6 6 6 0 016 6v2M9 18v-2M15 18v-2"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10a4 4 0 100-8 4 4 0 000 8z"/>
      </svg>
    ),
    // Two interlinked rings → romance
    romance: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="8"  cy="12" r="5" strokeWidth={1.5}/>
        <circle cx="16" cy="12" r="5" strokeWidth={1.5}/>
      </svg>
    ),
    // Briefcase → business
    business: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth={1.5}/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="12" strokeWidth={2} strokeLinecap="round"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 13h20"/>
      </svg>
    ),
    // Sun + waves → beach
    beach: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" strokeWidth={1.5}/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 22c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
      </svg>
    ),
    // Triangle peak → mountain
    mountain: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 20l6-12 3 5 3-3 6 10H3z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 8l1.5-2.5"/>
      </svg>
    ),
    // Columns → culture / heritage
    culture: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 7h18M6 7v14M10 7v14M14 7v14M18 7v14M12 3l9 4H3l9-4z"/>
      </svg>
    ),
  };

  const experiences = [
    {
      iconKey: "adventure", category: "adventure",
      title: "Adventure Tours",
      description: "Breathtaking landscapes and thrilling adventures with expert guides.",
      features: ["Mountain Trekking", "Desert Safari", "Water Sports", "Wildlife Tours"],
      price: "From $299", duration: "Half-day to Multi-day", rating: 4.9,
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
      description: "Exquisite cuisines prepared by renowned chefs in elegant settings.",
      features: ["Michelin Star Chefs", "Wine Tasting", "Private Dining", "Chef's Table"],
      price: "From $199", duration: "2–3 hours", rating: 4.9,
    },
    {
      iconKey: "business", category: "business",
      title: "Business Facilities",
      description: "State-of-the-art meeting rooms and business centers.",
      features: ["Conference Rooms", "High-Speed WiFi", "Tech Support", "Catering"],
      price: "From $99", duration: "Half-day to Full-day", rating: 4.7,
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
      price: "From $399", duration: "Full-day to Weekend", rating: 5.0,
    },
  ];

  const highlights = [
    {
      iconKey: "beach", title: "Exclusive Beach Resort",
      description: "Private beach access with water sports and sunset dining",
      duration: "3 Days / 2 Nights", price: "From $1,299", rating: 4.9,
    },
    {
      iconKey: "mountain", title: "Mountain Retreat & Wellness",
      description: "Yoga, meditation, and spa treatments in serene mountains",
      duration: "5 Days / 4 Nights", price: "From $1,599", rating: 4.8,
    },
    {
      iconKey: "culture", title: "Cultural Heritage Tour",
      description: "Explore ancient sites with expert guides and local cuisine",
      duration: "7 Days / 6 Nights", price: "From $2,199", rating: 4.9,
    },
  ];

  const testimonials = [
    { name: "Sarah Johnson", location: "New York, USA", rating: 5, comment: "The adventure tour was absolutely incredible! Every detail was perfectly planned and the guides were exceptional.", experience: "Mountain Trekking" },
    { name: "Michael Chen",  location: "Singapore",     rating: 5, comment: "The spa experience was divine. I felt completely refreshed after my stay. The therapists were highly skilled.", experience: "Luxury Spa Package" },
    { name: "Emma Williams", location: "London, UK",    rating: 5, comment: "The culinary experience exceeded all expectations. Learning from a Michelin-star chef was a dream come true.", experience: "Chef's Cooking Class" },
    { name: "Carlos Rodriguez", location: "Barcelona, Spain", rating: 5, comment: "Our romantic getaway was absolutely magical. From the candlelit dinner to the sunset cruise, every moment was perfect.", experience: "Romantic Escape" },
  ];

  const stats = [
    { number: "500+", label: "Experiences",    sub: "Curated activities" },
    { number: "50K+", label: "Happy Guests",   sub: "Satisfied travelers" },
    { number: "4.9★", label: "Avg Rating",     sub: "Outstanding reviews" },
    { number: "100+", label: "Destinations",   sub: "Worldwide coverage" },
  ];

  const filtered = activeTab === "all" ? experiences : experiences.filter(e => e.category === activeTab);

  if (loading) return <PageSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <section className="bg-gray-900 pt-28 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Curated Experiences
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair leading-tight mb-5">
            Unforgettable<br />
            <span className="text-gray-300">Experiences</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover unique moments and create lasting memories with our carefully curated experiences designed to inspire and delight.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => document.getElementById("experiences-grid")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Explore Experiences
            </button>
            <button
              onClick={() => navigate("/search")}
              className="px-8 py-3.5 border border-gray-600 text-gray-300 rounded-xl font-semibold hover:border-gray-400 hover:text-white transition-colors text-sm"
            >
              Browse Hotels
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-gray-100 px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-1">{s.number}</p>
              <p className="text-sm font-semibold text-gray-700">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Tabs + Cards ── */}
      <section id="experiences-grid" className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-2">Explore by Category</h2>
            <p className="text-gray-500 text-sm">Find the perfect experience for your interests</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === cat.id
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exp) => (
              <div key={exp.title} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-shadow overflow-hidden flex flex-col">
                {/* Icon header */}
                <div className="bg-gray-50 border-b border-gray-100 px-6 pt-8 pb-6 flex items-start justify-between">
                  <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {icons[exp.iconKey]}
                  </div>
                  <div className="flex items-center gap-1 bg-gray-900 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl">
                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {exp.rating}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg font-playfair leading-snug">{exp.title}</h3>
                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap">{exp.price}</span>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{exp.description}</p>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {exp.duration}
                  </div>

                  <div className="space-y-1.5 mb-5">
                    {exp.features.slice(0, 3).map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="flex-1" />
                  <button className="w-full bg-gray-900 hover:bg-gray-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature Packages ── */}
      <section className="bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Packages</span>
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mt-2 mb-2">Signature Experiences</h2>
            <p className="text-gray-500 text-sm">Premium packages combining multiple experiences for the ultimate getaway</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <div key={i} className="group bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="bg-white border-b border-gray-100 px-6 pt-7 pb-5 flex items-start justify-between">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {icons[h.iconKey]}
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-xl">
                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {h.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 font-playfair leading-snug">{h.title}</h3>
                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap">{h.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{h.description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {h.duration}
                  </div>
                  <button className="w-full border border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-700 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIP Banner ── */}
      <section className="bg-gray-900 px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Premium Package</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mt-3 mb-4 leading-tight">
                Exclusive VIP Experience
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Elevate your stay with our premium VIP package — private tours, personal concierge, luxury transportation, and access to exclusive venues and events.
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors">
                  Inquire Now
                </button>
                <button className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl font-semibold text-sm hover:border-gray-400 hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  title: "Private Butler", desc: "Dedicated personal service",
                  svg: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                },
                {
                  title: "Luxury Transport", desc: "Premium vehicle fleet",
                  svg: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1h8zM13 16l2-5h4l2 5H13z" /></svg>
                },
                {
                  title: "Exclusive Access", desc: "VIP events & venues",
                  svg: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    {item.svg}
                  </div>
                  <p className="text-white text-xs font-semibold mb-1">{item.title}</p>
                  <p className="text-gray-400 text-[11px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-gray-50 px-6 md:px-16 lg:px-24 xl:px-32 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-2">What Our Guests Say</h2>
            <p className="text-gray-500 text-sm">Real stories from travelers who experienced unforgettable moments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic line-clamp-4">"{t.comment}"</p>
                <div className="border-t border-gray-100 pt-3">
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                  <p className="text-gray-500 text-xs mt-1 font-medium">{t.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-900 px-6 md:px-16 lg:px-24 xl:px-32 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white font-playfair mb-4">Start Your Journey Today</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Book your experience and let us create unforgettable moments for you and your loved ones.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/search")}
              className="px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Browse Hotels
            </button>
            <button
              onClick={() => document.getElementById("experiences-grid")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 border border-gray-600 text-gray-300 rounded-xl font-semibold hover:border-gray-400 hover:text-white transition-colors text-sm"
            >
              View Experiences
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Experience;
