import { NavLink } from "react-router";

const Cot = () => {

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm font-semibold mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Home?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Contact our smart home specialists for a personalized consultation and demo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left side - Contact Form */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-8">Send us a message</h3>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Project Type</label>
                <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                  <option>Select project type</option>
                  <option>Full Home Automation</option>
                  <option>Security System</option>
                  <option>Lighting Control</option>
                  <option>Climate Control</option>
                  <option>Custom Solution</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea 
                  rows="4" 
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Tell us about your smart home vision..."
                ></textarea>
              </div>

              <NavLink to ="/register" 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Schedule Free Consultation
              </NavLink>
            </form>
          </div>

          {/* Right side - Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                <div className="bg-blue-500/10 p-4 rounded-lg inline-block mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h4 className="font-bold text-xl mb-2">Call Us</h4>
                <p className="text-gray-400">Mon-Fri from 8am to 6pm</p>
                <a href="tel:+18005551234" className="text-white text-lg font-semibold hover:text-blue-400 transition-colors">
                   (88+)01407038855
                </a>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
                <div className="bg-purple-500/10 p-4 rounded-lg inline-block mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h4 className="font-bold text-xl mb-2">Email Us</h4>
                <p className="text-gray-400">Typically replies in 2 hours</p>
                <a href="mailto:hello@smarthome.com" className="text-white text-lg font-semibold hover:text-purple-400 transition-colors">
                  nayeembabu2k6@gmail.com
                </a>
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4">Visit Our Showroom</h4>
                  <p className="text-gray-400 mb-4">Experience our smart home solutions first-hand</p>
                  <div className="space-y-2">
                    <p className="text-white">📍 123 Innovation Drive</p>
                    <p className="text-white">San Francisco, CA 94107</p>
                    <p className="text-white">United States</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-2">24/7 Emergency Support</h4>
                  <p className="text-gray-400">For urgent technical assistance</p>
                </div>
                <a href="tel:+18005559999" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Emergency
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Cot;