import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "#" },
    { name: "Press & Media", path: "#" },
    { name: "Blog", path: "#" },
    { name: "Partners", path: "#" },
  ];

  const supportLinks = [
    { name: "Help Center", path: "#" },
    { name: "Safety Information", path: "#" },
    { name: "Cancellation Options", path: "#" },
    { name: "Contact Us", path: "#" },
    { name: "Accessibility", path: "#" },
  ];

  const discoverLinks = [
    { name: "Hotels", path: "/rooms" },
    { name: "Experiences", path: "/experience" },
    { name: "Destinations", path: "#" },
    { name: "Special Offers", path: "#" },
    { name: "Gift Cards", path: "#" },
  ];

  const socialLinks = [
    { icon: assets.instagramIcon, name: "Instagram", url: "#" },
    { icon: assets.facebookIcon, name: "Facebook", url: "#" },
    { icon: assets.twitterIcon, name: "Twitter", url: "#" },
    { icon: assets.linkendinIcon, name: "LinkedIn", url: "#" },
  ];

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 3 5 3 5s3-3.343 3-5c0-1.657-1.343-3-3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414" />
      </svg>
    ),
    text: "Best Price Guarantee",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 11h14v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7z" />
      </svg>
    ),
    text: "Secure Booking",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.2-3.2A7.72 7.72 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    text: "24/7 Support",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "Verified Reviews",
  },
];

  return (
    <footer className="bg-gradient-to-br mt-[4rem] from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-700">
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 justify-center md:justify-start group"
              >
                <div className="text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all">
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img
                src={assets.logo}
                alt="logo"
                className="w-44 h-auto object-cover brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Discover the world's most extraordinary places to stay, from
              boutique hotels to luxury villas and private islands. Your perfect
              getaway awaits.
            </p>

            {/* Social Links */}
            <div className="mb-6">
              <p className="text-white font-semibold mb-4">Follow Us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group border border-gray-700 hover:border-transparent"
                    aria-label={social.name}
                  >
                    <img
                      src={social.icon}
                      className="w-5 h-5 brightness-0 invert group-hover:scale-110 transition-transform"
                      alt={social.name}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* App Download Badges */}
            <div>
              <p className="text-white font-semibold mb-3">Download Our App</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-lg flex items-center gap-3 transition-colors border border-gray-700 hover:border-gray-600">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold text-white">App Store</div>
                  </div>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-lg flex items-center gap-3 transition-colors border border-gray-700 hover:border-gray-600">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-semibold text-white">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Discover</h3>
            <ul className="space-y-3">
              {discoverLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="mt-12 pt-12 border-t border-gray-700">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white font-bold text-2xl mb-3">
              Stay Updated with Exclusive Offers
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for travel inspiration, special deals, and insider tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Enter your email address"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2">
                Subscribe
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div> */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} QuickStay. Built by{" "}
              <span className="text-gray-300 font-medium">Ahmed Mohamed</span>
              . All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
