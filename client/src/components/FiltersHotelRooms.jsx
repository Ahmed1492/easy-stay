import { useState } from "react";
import { BedDouble, Check, ChevronDown, CircleDollarSign, RotateCcw, Sparkles } from "lucide-react";
import { facilityIcons } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

export const DEFAULT_ROOM_TYPES = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];

export const PRICE_RANGES = [
  { id: "0-500", min: 0, max: 500, label: (c) => `${c}0 – ${c}500` },
  { id: "500-1000", min: 500, max: 1000, label: (c) => `${c}500 – ${c}1,000` },
  { id: "1000-2000", min: 1000, max: 2000, label: (c) => `${c}1,000 – ${c}2,000` },
  { id: "2000-3000", min: 2000, max: 3000, label: (c) => `${c}2,000 – ${c}3,000` },
  { id: "3000+", min: 3000, max: Infinity, label: (c) => `${c}3,000+` },
];

const Section = ({ title, icon: Icon, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between mb-3 cursor-pointer"
      >
        <span className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100">
            <Icon className="w-4 h-4 text-gray-700" />
          </span>
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
        />
      </button>
      {open && children}
    </div>
  );
};

const CheckRow = ({ checked, onChange, label, count }) => (
  <label
    className={`flex items-center gap-3 px-2.5 py-2 rounded-xl cursor-pointer transition-colors ${
      checked ? "bg-gray-900/5" : "hover:bg-gray-50"
    } ${count === 0 && !checked ? "opacity-50" : ""}`}
  >
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
    <span
      className={`flex items-center justify-center w-5 h-5 rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gray-900/20 ${
        checked ? "bg-gray-900 border-gray-900" : "border-gray-300 bg-white"
      }`}
    >
      {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
    </span>
    <span className={`flex-1 text-sm ${checked ? "text-gray-900 font-medium" : "text-gray-600"}`}>
      {label}
    </span>
    <span className="text-xs text-gray-400 tabular-nums">{count}</span>
  </label>
);

const FiltersHotelRooms = ({
  selectedFilters,
  toggleFilter,
  clearAllFilters,
  roomTypes,
  amenities,
  counts,
  activeFilterCount,
}) => {
  const { currency } = useAppContext();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-gray-900 text-white text-xs align-middle">
              {activeFilterCount}
            </span>
          )}
        </h3>
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="px-5 py-5 divide-y divide-gray-100">
        {/* Room Types */}
        <Section title="Room Type" icon={BedDouble}>
          <div className="space-y-1">
            {roomTypes.map((type) => (
              <CheckRow
                key={type}
                label={type}
                count={counts.roomType[type] || 0}
                checked={selectedFilters.roomType.includes(type)}
                onChange={() => toggleFilter("roomType", type)}
              />
            ))}
          </div>
        </Section>

        {/* Price Range */}
        <Section title="Price per Night" icon={CircleDollarSign}>
          <div className="space-y-1">
            {PRICE_RANGES.map((range) => (
              <CheckRow
                key={range.id}
                label={range.label(currency)}
                count={counts.priceRange[range.id] || 0}
                checked={selectedFilters.priceRange.includes(range.id)}
                onChange={() => toggleFilter("priceRange", range.id)}
              />
            ))}
          </div>
        </Section>

        {/* Amenities */}
        {amenities.length > 0 && (
          <Section title="Amenities" icon={Sparkles}>
            <div className="flex flex-wrap gap-2">
              {amenities.map((item) => {
                const active = selectedFilters.amenities.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleFilter("amenities", item)}
                    aria-pressed={active}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {facilityIcons[item] && (
                      <img
                        src={facilityIcons[item]}
                        alt=""
                        className={`w-3.5 h-3.5 ${active ? "invert" : ""}`}
                      />
                    )}
                    {item}
                    <span className={active ? "text-white/60" : "text-gray-400"}>
                      {counts.amenities[item] || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default FiltersHotelRooms;
