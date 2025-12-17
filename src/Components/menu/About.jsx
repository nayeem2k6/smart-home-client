const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image/Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Smart Home Automation"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/10"></div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">15,000+</p>
                  <p className="text-gray-600">Homes Automated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:pl-12">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              ABOUT OUR MISSION
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transforming Living Spaces Into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Intelligent Ecosystems
              </span>
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We pioneer next-generation smart home solutions that seamlessly
              integrate technology with everyday living. Our AI-powered systems
              learn your habits, anticipate your needs, and create the perfect
              environment for every moment.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Military-Grade Security
                  </h4>
                  <p className="text-gray-600 text-sm">
                    End-to-end encrypted smart home network
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Energy Optimized
                  </h4>
                  <p className="text-gray-600 text-sm">
                    AI reduces energy consumption by up to 40%
                  </p>
                </div>
              </div>
            </div>

            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <span className="relative z-10">Explore Our Technology</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
