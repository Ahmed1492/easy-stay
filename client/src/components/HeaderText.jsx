import { Sparkles } from "lucide-react";

const HeaderText = ({
  title,
  description,
  style = "",
  eyebrow = "Discover More",
  icon: Icon = Sparkles,
  action,
}) => {
  return (
    <div className="mt-28 animate-fade-in flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className={`flex flex-col gap-4 ${style}`}>
        <span className="inline-flex items-center gap-2 w-max px-4 py-1.5 rounded-full bg-gray-900/5 border border-gray-900/10 text-gray-700 text-xs font-semibold uppercase tracking-widest">
          <Icon className="w-3.5 h-3.5 text-amber-500" />
          {eyebrow}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-gray-900 leading-tight">
          {title}
        </h2>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
        <p className="max-w-2xl text-gray-600 text-lg leading-relaxed">{description}</p>
      </div>
      {action}
    </div>
  );
};

export default HeaderText;
