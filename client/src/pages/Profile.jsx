import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  ChevronRight,
  Crown,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Shield,
  UserRound,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { optimizeImage } from "../utils/image";

const fmtRange = (a, b) => {
  const opts = { month: "short", day: "numeric" };
  return `${new Date(a).toLocaleDateString("en-US", opts)} – ${new Date(b).toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
};

const daysUntil = (date) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return Math.round((new Date(date) - start) / 86400000);
};

const Row = ({ icon: Icon, label, value, action, onAction }) => (
  <div className="flex items-center justify-between gap-4 py-5 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-4 min-w-0">
      <Icon className="w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.75} />
      <div className="min-w-0">
        <p className="text-sm text-gray-900">{label}</p>
        <p className="text-sm text-gray-500 truncate">{value}</p>
      </div>
    </div>
    {action && (
      <button
        onClick={onAction}
        className="shrink-0 text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-600 cursor-pointer"
      >
        {action}
      </button>
    )}
  </div>
);

const LinkRow = ({ icon: Icon, label, sub, onClick, danger }) => (
  <button
    onClick={onClick}
    className="group w-full flex items-center justify-between gap-4 py-5 border-b border-gray-100 last:border-0 text-left cursor-pointer"
  >
    <span className="flex items-center gap-4 min-w-0">
      <Icon className={`w-5 h-5 shrink-0 ${danger ? "text-red-500" : "text-gray-400"}`} strokeWidth={1.75} />
      <span className="min-w-0">
        <span className={`block text-sm ${danger ? "text-red-600" : "text-gray-900"}`}>{label}</span>
        {sub && <span className="block text-sm text-gray-500 truncate">{sub}</span>}
      </span>
    </span>
    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all shrink-0" />
  </button>
);

const Profile = () => {
  const { user, backEndUrl, getToken, currency, isOwner, setShowHotelReg } = useAppContext();
  const { isLoaded } = useUser();
  const { openUserProfile, signOut } = useClerk();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({ totalBookings: 0, pendingBookings: 0, completedBookings: 0, totalSpent: 0 });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(`${backEndUrl}/api/user/profile`, {
          headers: { "ngrok-skip-browser-warning": "true", Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          if (data.stats) setUserStats(data.stats);
          setRecentBookings(data.recentBookings || []);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user, backEndUrl, getToken]);

  const nextTrip = useMemo(
    () =>
      recentBookings
        .filter((b) => b.status !== "cancelled" && daysUntil(b.checkOutDate) > 0)
        .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate))[0],
    [recentBookings]
  );

  if (!isLoaded) return <div className="min-h-screen bg-white" />;

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <UserRound className="w-12 h-12 mx-auto mb-4 text-gray-300" strokeWidth={1.5} />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Log in to see your profile</h2>
          <p className="text-gray-500 mb-6">Your trips, details and settings will appear here.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const fullName = user.fullName || [user.firstName, user.lastName].filter(Boolean).join(" ") || "Traveler";
  const firstName = user.firstName || fullName.split(" ")[0];
  const email = user.primaryEmailAddress?.emailAddress;
  const memberYears = user.createdAt
    ? Math.max(0, new Date().getFullYear() - new Date(user.createdAt).getFullYear())
    : 0;

  const facts = [
    { value: userStats.totalBookings, label: userStats.totalBookings === 1 ? "Trip" : "Trips" },
    { value: userStats.completedBookings, label: "Confirmed" },
    {
      value: memberYears > 0 ? memberYears : "New",
      label: memberYears > 0 ? (memberYears === 1 ? "Year on QuickStay" : "Years on QuickStay") : "to QuickStay",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-20 items-start">
          {/* ── Left: identity card ── */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <div className="rounded-3xl p-8 shadow-[0_6px_30px_rgba(0,0,0,0.08)] border border-gray-100">
              <div className="grid grid-cols-[auto_1fr] items-center gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <img
                      src={user.imageUrl || assets.userIcon}
                      alt={fullName}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white ring-4 ring-white">
                      <BadgeCheck className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-gray-900 leading-tight">{firstName}</p>
                  <p className="flex items-center gap-1 text-xs font-medium text-gray-500">
                    {isOwner ? <Crown className="w-3.5 h-3.5" /> : <UserRound className="w-3.5 h-3.5" />}
                    {isOwner ? "Hotel owner" : "Guest"}
                  </p>
                </div>
                <div className="divide-y divide-gray-100">
                  {facts.map(({ value, label }) => (
                    <div key={label} className="py-2.5 first:pt-0 last:pb-0">
                      {loading && typeof value === "number" ? (
                        <div className="h-6 w-8 bg-gray-100 rounded animate-pulse" />
                      ) : (
                        <p className="text-xl font-semibold text-gray-900 leading-none">{value}</p>
                      )}
                      <p className="text-[11px] text-gray-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 p-6">
              <p className="text-lg font-semibold text-gray-900 mb-3">{firstName}'s confirmed info</p>
              <ul className="space-y-2.5 text-sm text-gray-700">
                {email && (
                  <li className="flex items-center gap-2.5">
                    <BadgeCheck className="w-4 h-4 text-gray-900" />
                    Email address
                  </li>
                )}
                <li className="flex items-center gap-2.5">
                  <BadgeCheck className="w-4 h-4 text-gray-900" />
                  Account verified with QuickStay
                </li>
              </ul>
            </div>
          </aside>

          {/* ── Right: details ── */}
          <main className="min-w-0">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">About {firstName}</h1>
            <p className="text-gray-500 mb-10">
              Manage your details, trips and account in one place.
            </p>

            {/* Next trip */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming trip</h2>
                <button
                  onClick={() => navigate("/my-bookings")}
                  className="text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-600 cursor-pointer"
                >
                  All trips
                </button>
              </div>
              {loading ? (
                <div className="h-32 rounded-2xl bg-gray-100 animate-pulse" />
              ) : nextTrip ? (
                <button
                  onClick={() => navigate("/my-bookings")}
                  className="group w-full flex items-stretch gap-0 rounded-2xl border border-gray-200 overflow-hidden text-left hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-shadow cursor-pointer"
                >
                  <div className="flex-1 p-5 min-w-0">
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      {daysUntil(nextTrip.checkInDate) <= 0
                        ? "Happening now"
                        : `In ${daysUntil(nextTrip.checkInDate)} day${daysUntil(nextTrip.checkInDate) === 1 ? "" : "s"}`}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 truncate">{nextTrip.hotel?.name || "Your stay"}</p>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {nextTrip.hotel?.city}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {fmtRange(nextTrip.checkInDate, nextTrip.checkOutDate)}
                    </p>
                  </div>
                  {nextTrip.room?.images?.[0] && (
                    <img
                      src={optimizeImage(nextTrip.room.images[0], 500)}
                      alt=""
                      className="w-32 sm:w-44 object-cover"
                    />
                  )}
                </button>
              ) : (
                <div className="rounded-2xl border border-gray-200 p-6">
                  <p className="font-semibold text-gray-900 mb-1">No trips booked… yet!</p>
                  <p className="text-sm text-gray-500 mb-4">Time to dust off your bags and start planning your next adventure.</p>
                  <button
                    onClick={() => navigate("/rooms")}
                    className="px-5 py-2.5 rounded-lg border border-gray-900 text-sm font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
                  >
                    Start searching
                  </button>
                </div>
              )}
            </section>

            {/* Personal info */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Personal info</h2>
              <div>
                <Row icon={UserRound} label="Legal name" value={fullName} action="Edit" onAction={() => openUserProfile()} />
                <Row icon={Mail} label="Email address" value={email || "Not provided"} action="Edit" onAction={() => openUserProfile()} />
                <Row
                  icon={CalendarDays}
                  label="Member since"
                  value={user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—"}
                />
                <Row
                  icon={Building2}
                  label="Total spent on confirmed stays"
                  value={`${currency}${userStats.totalSpent.toLocaleString()}`}
                />
              </div>
            </section>

            {/* Account */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Account</h2>
              <div>
                {isOwner ? (
                  <LinkRow icon={LayoutDashboard} label="Hotel dashboard" sub="Manage rooms and bookings" onClick={() => navigate("/owner")} />
                ) : (
                  <LinkRow icon={Building2} label="List your hotel" sub="Start hosting guests on QuickStay" onClick={() => setShowHotelReg(true)} />
                )}
                <LinkRow icon={Shield} label="Login & security" sub="Password, connected accounts, delete account" onClick={() => openUserProfile()} />
                <LinkRow icon={LogOut} label="Log out" onClick={() => signOut(() => navigate("/"))} danger />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
