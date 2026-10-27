import { useNavigate } from "react-router-dom";
import {
  Award,
  BadgeCheck,
  BadgePercent,
  CalendarClock,
  Eye,
  Gift,
  Handshake,
  Headset,
  Heart,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import heroImage from "../assets/heroImage.png";
import roomImg1 from "../assets/roomImg1.png";
import roomImg2 from "../assets/roomImg2.png";

const stats = [
  { number: "500+", label: "Partner hotels" },
  { number: "50K+", label: "Happy guests" },
  { number: "100+", label: "Destinations" },
  { number: "24/7", label: "Guest support" },
];

const purpose = [
  {
    icon: Target,
    title: "Our mission",
    text: "To provide seamless booking experiences and connect travelers with exceptional accommodations that exceed expectations. We make great hospitality accessible and memorable for everyone.",
  },
  {
    icon: Eye,
    title: "Our vision",
    text: "To become the world's most trusted hotel booking platform, setting new standards in hospitality technology while keeping the personal touch that makes every stay special.",
  },
];

const values = [
  { title: "Excellence", description: "We sweat the details so every stay feels effortless.", icon: Star },
  { title: "Integrity", description: "Clear prices and honest listings — no surprises.", icon: Handshake },
  { title: "Innovation", description: "Always improving how you search, book and travel.", icon: Lightbulb },
  { title: "Care", description: "Guests are at the center of everything we build.", icon: Heart },
];

const timeline = [
  { year: "2010", title: "Founded", description: "Started with 10 partner hotels and a vision to transform hospitality.", icon: Rocket },
  { year: "2015", title: "Growing", description: "Expanded to 50+ destinations and reached 10,000 bookings.", icon: TrendingUp },
  { year: "2020", title: "Innovating", description: "Launched personalized recommendations and our mobile app.", icon: Lightbulb },
  { year: "2024", title: "Leading", description: "Recognized as an industry leader with 500+ hotel partners.", icon: Award },
];

const team = [
  { name: "John Anderson", role: "Founder & CEO", bio: "20+ years in hospitality, former VP at Marriott International." },
  { name: "Sarah Mitchell", role: "Head of Operations", bio: "Harvard MBA, expert in delivering exceptional guest experiences." },
  { name: "David Park", role: "Technology Director", bio: "Former Google engineer, building better hospitality tech." },
  { name: "Emily Rodriguez", role: "Guest Experience Lead", bio: "15+ years in luxury hospitality, passionate about service." },
];

const features = [
  { title: "Best price guarantee", desc: "Always get the best available rate for your dates.", icon: BadgePercent },
  { title: "Secure booking", desc: "Payments are encrypted and handled by Stripe.", icon: ShieldCheck },
  { title: "24/7 support", desc: "Our team is ready to help, any time of day.", icon: Headset },
  { title: "Verified reviews", desc: "Read honest reviews from real guests.", icon: BadgeCheck },
  { title: "Flexible plans", desc: "Pay online now or pay when you arrive at the hotel.", icon: CalendarClock },
  { title: "Member rewards", desc: "Unlock exclusive offers as you travel more.", icon: Gift },
];

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

const SectionHeading = ({ title, subtitle }) => (
  <div className="mb-10 max-w-2xl">
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">{title}</h2>
    {subtitle && <p className="text-gray-500">{subtitle}</p>}
  </div>
);

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-24">
        {/* ── Hero ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-4">About QuickStay</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-[1.1] mb-6">
              Stays that feel like home, wherever you go.
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Since 2010 we've connected travelers with exceptional hotels around the world —
              through simple technology and genuinely personal service.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/rooms")}
                className="px-6 py-3 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Find a stay
              </button>
              <button
                onClick={() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-lg border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Our story
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[22rem] md:h-[26rem]">
            <img src={heroImage} alt="" className="row-span-2 w-full h-full object-cover rounded-2xl" />
            <img src={roomImg1} alt="" className="w-full h-full object-cover rounded-2xl" />
            <img src={roomImg2} alt="" className="w-full h-full object-cover rounded-2xl" />
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 border-y border-gray-200 mb-24">
          {stats.map(({ number, label }, i) => (
            <div
              key={label}
              className={`py-8 px-4 text-center ${i % 2 === 1 ? "border-l border-gray-200" : ""} ${
                i >= 2 ? "border-t md:border-t-0 border-gray-200" : ""
              } ${i === 2 ? "md:border-l" : ""}`}
            >
              <p className="text-3xl md:text-4xl font-semibold text-gray-900">{number}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </section>

        {/* ── Mission & Vision ── */}
        <section id="our-story" className="scroll-mt-28 mb-24">
          <SectionHeading title="What drives us" subtitle="The purpose behind everything we build." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purpose.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-gray-200 p-8">
                <Icon className="w-8 h-8 text-gray-900 mb-5" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Values ── */}
        <section className="mb-24">
          <SectionHeading title="Our values" subtitle="The principles that guide every decision we make." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map(({ title, description, icon: Icon }) => (
              <div key={title}>
                <Icon className="w-8 h-8 text-gray-900 mb-4" strokeWidth={1.5} />
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="mb-24">
          <SectionHeading title="Our journey" subtitle="Key milestones in our story so far." />
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {timeline.map(({ year, title, description, icon: Icon }, i) => (
              <li key={year} className="relative pl-8 md:pl-0 md:pt-10">
                {/* line + dot */}
                {i < timeline.length - 1 && (
                  <span className="absolute left-[7px] top-2 bottom-[-2rem] w-px bg-gray-200 md:hidden" aria-hidden />
                )}
                <span
                  className={`hidden md:block absolute top-[7px] left-0 h-px bg-gray-200 ${
                    i === timeline.length - 1 ? "right-1/2" : "-right-6"
                  }`}
                  aria-hidden
                />
                <span className="absolute left-0 top-1 md:top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-900" aria-hidden />
                <p className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
                  <Icon className="w-4 h-4" />
                  {year}
                </p>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Team ── */}
        <section className="mb-24">
          <SectionHeading title="Meet the team" subtitle="The people behind QuickStay." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl border border-gray-200 p-6 text-center">
                <span className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 text-gray-700 text-xl font-semibold">
                  {initials(member.name)}
                </span>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why choose us ── */}
        <section className="mb-24">
          <SectionHeading title="Why book with QuickStay" subtitle="Everything you need for a stress-free stay." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {features.map(({ title, desc, icon: Icon }) => (
              <div key={title} className="flex items-start gap-4">
                <Icon className="w-7 h-7 text-gray-900 shrink-0" strokeWidth={1.5} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="rounded-3xl bg-gray-50 border border-gray-100 px-8 py-12 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Ready for your next stay?</h2>
            <p className="text-gray-500">Browse hand-picked hotels and book in a few clicks — pay online or at the hotel.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => navigate("/rooms")}
              className="px-6 py-3 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Explore hotels
            </button>
            <button
              onClick={() => navigate("/experience")}
              className="px-6 py-3 rounded-lg border border-gray-900 text-gray-900 text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              See experiences
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
