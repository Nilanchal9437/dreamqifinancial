"use client";

import * as React from "react";
import Image from "next/image";
import { Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import login from "@/features/login/apis/login";
import schema from "@/features/login/schema";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      {/* Form Section */}
      <div className="w-full px-4 md:w-1/2 md:mx-0">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            login(values);
          }}
          validationSchema={schema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
              <h2 className="text-green-600 font-semibold text-4xl mb-2">
                Log In
              </h2>
              <h1 className="text-2xl font-semibold mb-2">Get Started Now!</h1>
              <p className="text-gray-500 text-sm">
                At DreamQi Financial, we believe in making finance simple,
                accessible, and personalised. With years of experience in the
                mortgage and finance industry, we’ve helped clients across
                Australia secure loans that support their life goals—whether
                that’s buying a home, growing their investment portfolio, or
                funding a personal dream.
              </p>

              {/* Email Field */}
              <label className="block text-sm mt-4">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}

              {/* Password Field */}
              <label className="block text-sm mt-4">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-500" />
                  ) : (
                    <Eye className="text-gray-500" />
                  )}
                </button>
              </div>
              {formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-md mt-6 hover:bg-green-700 transition"
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      </div>
      {/* Image Section */}
      <div className="hidden md:block w-1/2 text-center">
        <Image
          alt="login-illustration"
          src="/login/login.png"
          height={250}
          width={250}
          className="w-[80%] h-auto"
          quality={100}
        />
      </div>
    </div>
  );
}

export default Login;
