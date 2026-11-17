
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-6 py-24 text-center">
      <div className="w-full max-w-[620px]">
        <span className="text-[13px] font-bold tracking-[3px]">
          PAGE NOT FOUND
        </span>

        <h1 className="my-2.5 text-[clamp(100px,20vw,190px)] font-extrabold leading-none">
          404
        </h1>

        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
          Looks like you've lost your way.
        </h2>

        <p className="text-base leading-[1.7] opacity-75">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
          <Link
            to="/"
            className="rounded-md bg-black px-6 py-[13px] font-semibold text-white no-underline transition-colors hover:bg-gray-800"
          >
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="rounded-md border border-current px-6 py-[13px] font-semibold text-inherit no-underline transition-colors hover:bg-black/5"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
