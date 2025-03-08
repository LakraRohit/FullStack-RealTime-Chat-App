import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import React, { useState } from 'react';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from '../store/useAuthStore';


const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false);

  const [formDate, setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formDate.fullName.trim()) return toast.error("Full name is required");
    if (!formDate.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formDate.email)) return toast.error("Invalid email format");
    if (!formDate.password) return toast.error("Password is required");
    if (formDate.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success == true) signup(formDate);

  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" >
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12' >
        <div className='w-full max-w-md space-y-8' >
          {/* LOGO */}
          <div className='text-center mb-8' >
            <div className='flex flex-col items-center gap-2 group' >
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors' >
              <MessageSquare className="size-6 text-primary"/>
              </div>
              <h1 className="text-2xl font-bold mt-2" >Create Account</h1>
              <p className="text-base-content/60" >Get started with your free account</p>
            </div>
          </div>

          {/* Form  */}
          <form onSubmit={handleSubmit} className="space-y-6" >

            {/* User  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="John Doe"
                    value={formDate.fullName}
                    onChange={(e) => setFormData({ ...formDate, fullName: e.target.value })}
                  />
                </div>
              </div>


              {/* Mail  */}
              <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="you@example.com"
                    value={formDate.email}
                    onChange={(e) => setFormData({ ...formDate, email: e.target.value })}
                  />
                </div>
              </div>


              {/* showPassword  */}
              <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full pl-10`}
                    placeholder="••••••••"
                    value={formDate.password}
                    onChange={(e) => setFormData({ ...formDate, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                  </button>
                </div>
              </div>


              <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

          </form>


          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>


      {/* Right Side  */}
      <AuthImagePattern
      title="Join our Community"
      subtitle="Connect with friends, share moments, and stay in touch with your friends and family"
      />

      









      
    </div>
  )

}

export default SignUpPage







