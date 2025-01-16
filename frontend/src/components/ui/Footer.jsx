import React from "react";

const Footer = () => {
  console.log("Footer");
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Left Section */}
          <p className="text-sm text-center sm:text-left">
            &copy; 2025 SpendWise. All Rights Reserved.
          </p>

          {/* Right Section */}
          <div className="mt-2 sm:mt-0">
            <nav className="flex space-x-4 text-sm">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/login" className="hover:underline">
                Login
              </a>
              <a href="/signup" className="hover:underline">
                Sign Up
              </a>
              <a href="/transactions" className="hover:underline">
                Transactions
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
