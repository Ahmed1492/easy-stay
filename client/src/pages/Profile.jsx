import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ── SVG icon set ─────────────────────────────────────────────────────────────
const Ic = {
  user: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  booking: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  settings: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  hotel: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
  plane: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>,
  check: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  money: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  search: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  star: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>,
  calendar: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  guests: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  arrow: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>,
  mail: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  download: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>,
  trash: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>,
  bell: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>,
  tag: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>,
  crown: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l3.5 5L12 3l3.5 5L19 3l1 14H4L5 3z"/></svg>,
};

const fmt = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const statusCfg = {
  confirmed: { dot: "bg-green-500", text: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  pending:   { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  cancelled: { dot: "bg-red-400",   text: "text-red-600",   bg: "bg-red-50",   border: "border-red-200"   },
};

const Profile = () => {
  const { user, backEndUrl, getToken, currency, isOwner } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({ totalBookings: 0, upcomingBookings: 0, completedBookings: 0, totalSpent: 0 });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => { if (user) fetchUserData(); }, [user]);

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backEndUrl}/api/user/profile`, {
        headers: { "ngrok-skip-browser-warning": "true", Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserStats(data.stats || userStats);
        setRecentBookings(data.recentBookings || []);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // ── not signed in ──
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-gray-400">
            {Ic.user}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in required</h2>
          <p className="text-gray-400 text-sm mb-6">You need to be logged in to view your profile.</p>
          <button onClick={() => navigate("/")} className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview",  icon: Ic.user     },
    { id: "bookings", label: "Bookings",  icon: Ic.booking  },
    { id: "settings", label: "Settings",  icon: Ic.settings },
  ];

  const stats = [
    { label: "Total Bookings",  value: userStats.totalBookings,                          icon: Ic.hotel  },
    { label: "Upcoming Trips",  value: userStats.upcomingBookings,                       icon: Ic.plane  },
    { label: "Completed",       value: userStats.completedBookings,                      icon: Ic.check  },
    { label: "Total Spent",     value: `${currency}${userStats.totalSpent.toLocaleString()}`, icon: Ic.money  },
  ];

  const quickActions = [
    { label: "Search Hotels",  sub: "Find your next perfect stay",  icon: Ic.search, action: () => navigate("/search")          },
    { label: "My Bookings",    sub: "View all reservations",        icon: Ic.booking, action: () => setActiveTab("bookings")    },
    { label: "Experiences",    sub: "Discover activities",          icon: Ic.star,   action: () => navigate("/experience")      },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <div className="bg-gray-900 pt-28 pb-16 px-6 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
              <img src={user?.imageUrl || assets.userIcon} alt={user?.fullName} className="w-full h-full object-cover" />
            </div>
            {isOwner && (
              <div className="absolute -bottom-2 -right-2 bg-white text-gray-900 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold shadow-lg">
                {Ic.crown} Owner
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white font-playfair leading-tight mb-1">
              {user?.fullName || `${user?.firstName} ${user?.lastName}`}
            </h1>
            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start mt-2">
              <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                {Ic.mail}
                {user?.primaryEmailAddress?.emailAddress}
              </span>
              <span className="text-gray-600 text-xs">·</span>
              <span className="text-gray-400 text-xs">
                Member since {new Date(user?.createdAt).getFullYear()}
              </span>
            </div>
          </div>

          {/* Owner CTA */}
          {isOwner && (
            <button
              onClick={() => navigate("/owner")}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Dashboard {Ic.arrow}
            </button>
          )}
        </div>
      </div>

      {/* ── Main ── */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10">
        <div className="max-w-5xl mx-auto">

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 flex-shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-none">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-2xl p-1.5 mb-6 shadow-sm w-fit">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === t.id ? "bg-gray-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <span className={activeTab === t.id ? "text-white" : "text-gray-400"}>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Overview ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {quickActions.map((a) => (
                  <button
                    key={a.label}
                    onClick={a.action}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left hover:border-gray-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-gray-100 group-hover:bg-gray-900 rounded-xl flex items-center justify-center text-gray-600 group-hover:text-white transition-colors mb-4">
                      {a.icon}
                    </div>
                    <p className="font-bold text-gray-900 text-sm mb-0.5">{a.label}</p>
                    <p className="text-xs text-gray-400">{a.sub}</p>
                  </button>
                ))}
              </div>

              {/* Recent activity */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                {recentBookings.length > 0 ? (
                  <div className="space-y-3">
                    {recentBookings.slice(0, 3).map((b, i) => {
                      const cfg = statusCfg[b.status] || statusCfg.pending;
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="w-9 h-9 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 flex-shrink-0">
                            {Ic.calendar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {b.hotel?.name || "Hotel Booking"}
                            </p>
                            <p className="text-xs text-gray-400">{fmt(b.createdAt)}</p>
                          </div>
                          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {b.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-gray-300">
                      {Ic.hotel}
                    </div>
                    <p className="text-sm text-gray-400 mb-4">No recent activity</p>
                    <button onClick={() => navigate("/search")} className="px-5 py-2 bg-gray-900 text-white rounded-xl text-xs font-semibold hover:bg-gray-700 transition-colors">
                      Start Exploring
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Bookings ── */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Recent Bookings</h3>
                <button onClick={() => navigate("/my-bookings")} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                  View all {Ic.arrow}
                </button>
              </div>

              {recentBookings.length > 0 ? (
                <div className="space-y-3">
                  {recentBookings.map((b, i) => {
                    const cfg = statusCfg[b.status] || statusCfg.pending;
                    return (
                      <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-sm transition-all">
                        {/* Image */}
                        <div className="w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                          {b.room?.images?.[0] && <img src={b.room.images[0]} alt="" className="w-full h-full object-cover" />}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">{b.hotel?.name || "Hotel"}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              {Ic.calendar}
                              {fmt(b.checkInDate)}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              {Ic.guests}
                              {b.guests}
                            </span>
                          </div>
                        </div>
                        {/* Price + status */}
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-900 text-sm">{currency}{b.totalPrice}</p>
                          <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {b.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-gray-300">
                    {Ic.booking}
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">No bookings yet</p>
                  <p className="text-xs text-gray-400 mb-5">Start your journey by booking your first stay</p>
                  <button onClick={() => navigate("/search")} className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
                    Explore Hotels
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Settings ── */}
          {activeTab === "settings" && (
            <div className="space-y-4">

              {/* Personal info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name",     value: user?.fullName || "" },
                    { label: "Email",         value: user?.primaryEmailAddress?.emailAddress || "" },
                    { label: "Username",      value: user?.username || "" },
                    { label: "Account Type",  value: isOwner ? "Hotel Owner" : "Guest" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input
                        type="text"
                        value={f.value}
                        disabled
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 outline-none"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-400">To update your info, visit your Clerk account settings.</p>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-3">
                  {[
                    { label: "Email Notifications", sub: "Booking confirmations and updates", defaultOn: true  },
                    { label: "Promotional Emails",  sub: "Special offers and deals",          defaultOn: false },
                  ].map((pref) => (
                    <div key={pref.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                          {pref.defaultOn ? Ic.bell : Ic.tag}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{pref.label}</p>
                          <p className="text-xs text-gray-400">{pref.sub}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={pref.defaultOn} />
                        <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-gray-900 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account actions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Account Actions</h3>
                <div className="space-y-2">
                  {!isOwner && (
                    <button
                      onClick={() => navigate("/owner")}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-900 hover:bg-gray-700 text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      <span className="flex items-center gap-2">{Ic.hotel} Become a Hotel Owner</span>
                      {Ic.arrow}
                    </button>
                  )}
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold transition-colors border border-gray-100">
                    <span className="flex items-center gap-2">{Ic.download} Download My Data</span>
                    {Ic.arrow}
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold transition-colors border border-red-100">
                    <span className="flex items-center gap-2">{Ic.trash} Delete Account</span>
                    {Ic.arrow}
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
