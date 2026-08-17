'use client'

import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries());
    
        const { data, error } = await authClient.signIn.email({
            email: user.email, 
            password: user.password, 
        });

        const { data: tokenData } = await authClient.token();
        console.log(tokenData); 

        if (data) {
            toast.success("Logged in successfully");
            router.push("/");
        }
        if (error) {
            toast.error("Error logging in: " + error.message);
        }
    };

   const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/", // Destination page after successful Google login
            });
        } catch (err) {
            toast.error("Failed to initiate Google sign-in");
            console.error(err);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-md p-8 sm:p-10 border border-slate-200/80 bg-white shadow-xl rounded-3xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                        Start your study room booking with studynook.
                    </p>
                </div>

                {/* Form */}
                <Form onSubmit={onSubmit} className="flex flex-col gap-5">
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-sm font-semibold text-slate-700">Email</Label>
                        <Input 
                            placeholder="john@example.com" 
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                        />
                        <FieldError className="text-xs text-red-500 font-medium mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        className="flex flex-col gap-1.5"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-sm font-semibold text-slate-700">Password</Label>
                        <Input 
                            placeholder="Enter your password" 
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none transition-all text-slate-800 placeholder:text-slate-400" 
                        />
                        <Description className="text-xs text-slate-400 mt-1">
                            Must be at least 8 characters with 1 uppercase & 1 number
                        </Description>
                        <FieldError className="text-xs text-red-500 font-medium mt-1" />
                    </TextField>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 mt-2">
                        <Button 
                            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-md shadow-blue-500/20" 
                            type="submit"
                        >
                            Log In
                        </Button>
                        <Button 
                            className="w-full h-10 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 font-medium transition-colors" 
                            type="reset" 
                            variant="light"
                        >
                            Reset
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center my-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <span className="relative bg-white px-3 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                            Or continue with
                        </span>
                    </div>

                    {/* Social Login */}
                    <Button
                        type="button"
                        onClick={handleGoogleSignIn}
                        variant="bordered"
                        className="w-full h-12 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 text-slate-700"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        Continue with Google
                    </Button>
                </Form>

                {/* Footer Link */}
                <div className="text-center mt-8 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-500 font-medium">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-blue-600 font-bold hover:underline underline-offset-4 transition-all"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;