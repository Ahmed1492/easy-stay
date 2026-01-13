import { testimonials } from "../assets/assets";
import StarRating from "./StarRating.jsx";

const Testimonials = () => {
  // const testimonials = [
  //   {
  //     id: 1,
  //     name: "Emma Rodriguez",
  //     address: "Barcelona, Spain",
  //     image:
  //       "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  //     rating: 5,
  //     review:
  //       "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended! I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly",
  //   },
  //   {
  //     id: 2,
  //     name: "Liam Johnson",
  //     address: "New York, USA",
  //     image:
  //       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  //     rating: 4,
  //     review:
  //       "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended! I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly",
  //   },
  //   {
  //     id: 3,
  //     name: "Sophia Lee",
  //     address: "Seoul, South Korea",
  //     image:
  //       "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
  //     rating: 5,
  //     review:
  //       "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended! I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly",
  //   },
  // ];

  const Star = ({ filled }) => (
    <svg
      className="w-4 h-4 text-yellow-400"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z"
      />
    </svg>
  );

  return (
    <div className=" pt-20 pb-30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7  mb-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 px-3 rounded-xl shadow w-full"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-gray-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <StarRating />
            </div>
            <p className="text-gray-500 max-w-md mt-4">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
