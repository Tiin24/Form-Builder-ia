import React from "react";

function Hero() {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold text-lime-950 sm:text-5xl">
              IA Form Builder
              <strong className="font-extrabold text-lime-500 sm:block">
                {" "}
                Create your Form in Seconds.{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Create intelligent forms in seconds using AI. Perfect for surveys,
              applications, and data collection.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded-sm bg-lime-900 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-lime-950 focus:ring-3 focus:outline-hidden sm:w-auto"
                href="#"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded-sm px-12 py-3 text-sm font-medium text-lime-500 shadow-sm hover:text-lime-950 focus:ring-3 focus:outline-hidden sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
