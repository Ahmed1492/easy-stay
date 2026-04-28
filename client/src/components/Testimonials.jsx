import { testimonials } from "../assets/assets";
import StarRating from "./StarRating.jsx";

const Testimonials = () => {
  return (
    <div className="pt-20 pb-10 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50 group-hover:ring-blue-100 transition-all"
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                <div>
                  <p className="font-playfair text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {testimonial.address}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating />
                <span className="text-sm font-semibold text-gray-600">(5.0)</span>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 leading-relaxed">
                "{testimonial.review}"
              </p>

              {/* Verified Badge */}
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Guest
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
