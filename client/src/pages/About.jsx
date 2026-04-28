import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { PageSkeleton } from "../components/SkeletonLoader";

const About = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { number: "500+", label: "Partner Hotels",  sub: "Across 6 continents" },
    { number: "50K+", label: "Happy Guests",    sub: "Since 2010" },
    { number: "100+", label: "Destinations",    sub: "Worldwide coverage" },
    { number: "24/7", label: "Support",         sub: "Always here for you" },
  ];

  const timeline = [
    { year: "2010", title: "Foundation",   description: "Started with 10 partner hotels and a vision to transform hospitality.", icon: "🚀" },
    { year: "2015", title: "Growth",       description: "Expanded to 50+ destinations and reached 10,000 bookings.", icon: "📈" },
    { year: "2020", title: "Innovation",   description: "Launched AI-powered recommendations and mobile app.", icon: "💡" },
    { year: "2024", title: "Leadership",   description: "Recognized as industry leader with 500+ hotel partners.", icon: "👑" },
  ];

  const team = [
    { name: "John Anderson",    role: "Founder & CEO",            bio: "20+ years in hospitality, former VP at Marriott International." },
    { name: "Sarah Mitchell",   role: "Head of Operations",       bio: "Harvard MBA, expert in delivering exceptional guest experiences." },
    { name: "David Park",       role: "Technology Director",      bio: "Former Google engineer, innovating hospitality tech solutions." },
    { name: "Emily Rodriguez",  role: "Customer Experience Lead", bio: "15+ years in luxury hospitality, passionate about service excellence." },
  ];

  const values = [
    { title: "Excellence",  description: "We strive for perfection in every detail of your stay.",          icon: "⭐" },
    { title: "Integrity",   description: "Building trust through transparent and honest relationships.",     icon: "🤝" },
    { title: "Innovation",  description: "Continuously improving our services and technology.",              icon: "💡" },
    { title: "Service",     description: "Putting our guests at the center of everything we do.",            icon: "❤️" },
  ];

  const features = [
    { title: "Best Price Guarantee",    desc: "We ensure you always get the best rates available.",              icon: "💰" },
    { title: "Secure Booking",          desc: "Your data is protected with industry-leading security.",          icon: "🔒" },
    { title: "24/7 Support",            desc: "Our dedicated team is always ready to assist you.",               icon: "🌟" },
    { title: "Verified Reviews",        desc: "Read authentic reviews from real, verified guests.",              icon: "✅" },
    { title: "Flexible Cancellation",   desc: "Enjoy peace of mind with our flexible cancellation policies.",   icon: "🔄" },
    { title: "Loyalty Rewards",         desc: "Earn points and unlock exclusive member benefits.",               icon: "🎁" },
  ];

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
            Trusted by 50,000+ travelers worldwide
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-playfair leading-tight mb-5">
            About <span className="text-gray-300">QuickStay</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Transforming hospitality experiences since 2010. We connect travelers with exceptional accommodations worldwide through innovative technology and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/search")}
              className="px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 border border-gray-600 text-gray-300 rounded-xl font-semibold hover:border-gray-400 hover:text-white transition-colors text-sm"
            >
              Our Story
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

      {/* ── Mission & Vision ── */}
      <section id="our-story" className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-2">Our Purpose & Vision</h2>
            <p className="text-gray-500 text-sm">The driving force behind everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Mission",
                text: "To provide seamless booking experiences and connect travelers with exceptional accommodations that exceed expectations. We make luxury hospitality accessible and memorable for everyone.",
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: "Vision",
                text: "To become the world's most trusted hotel booking platform, setting new standards in hospitality technology while maintaining the personal touch that makes every stay special.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-2">Our Core Values</h2>
            <p className="text-gray-500 text-sm">The principles that guide every decision we make</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="group bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl group-hover:scale-110 transition-transform duration-200">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-2">Our Journey</h2>
            <p className="text-gray-500 text-sm">Key milestones in our growth story</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {timeline.map((item, i) => (
              <div key={i} className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200">
                {/* connector line on desktop */}
                {i < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-2.5 w-5 h-px bg-gray-200 z-10" />
                )}
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{item.year}</p>
                <p className="font-semibold text-gray-800 mb-2 text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-2">Meet Our Leadership</h2>
            <p className="text-gray-500 text-sm">The experts behind our success</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <div key={i} className="group bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center hover:border-gray-200 hover:shadow-md transition-all duration-200">
                <div className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <img src={assets.userIcon} alt={member.name} className="w-8 h-8 brightness-0 invert" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{member.name}</h3>
                <p className="text-xs font-semibold text-gray-500 mb-2">{member.role}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-2">Why Choose QuickStay?</h2>
            <p className="text-gray-500 text-sm">We go above and beyond to ensure your travel experience is exceptional</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 text-lg group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{f.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gray-900 px-6 md:px-16 lg:px-24 xl:px-32 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white font-playfair mb-4">
            Join <span className="text-gray-300">50,000+</span> Happy Travelers
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed text-sm">
            Experience the difference with QuickStay. Your perfect stay awaits with personalized service, best prices, and unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={() => navigate("/search")}
              className="px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate("/experience")}
              className="px-8 py-3.5 border border-gray-600 text-gray-300 rounded-xl font-semibold hover:border-gray-400 hover:text-white transition-colors text-sm"
            >
              Explore Experiences
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              24/7 Customer Support
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              Instant Booking
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
