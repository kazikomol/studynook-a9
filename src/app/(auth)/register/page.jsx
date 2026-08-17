"use client"

import { Button, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const RegisterPage = () => {
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.ImageUrl,
            
        });

        console.log({ data, error });

        if (data) {
            toast.success("Account created successfully! ");
            router.push("/login");
        }
        if (error) {
            toast.error("Error creating account: " + error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="min-h-[80vh] flex flex-col py-12">
            <div className="grow flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32  rounded-full -mr-16 -mt-16 blur-3xl"></div>

                        <div className="text-center space-y-2 relative">
                            <h2 className="text-3xl font-black tracking-tight text-slate-900">
                                Join <span className="text-blue-600">Studynook</span>
                            </h2>
                            <p className="text-slate-500 font-medium">Create your account to create and book your study space</p>
                        </div>

                        <Form
                            onSubmit={handleRegister}
                            className="space-y-6"
                        >
                            <TextField
        isRequired
        name="name"
        type="text"
        
      >
        <Label>Name</Label>
        <Input placeholder="John Doe" className={"bg-white"} />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="ImageUrl"
        type="url"
        
      >
        <Label>Image URL</Label>
        <Input placeholder="https://example.com/image.jpg" className={"bg-white"}/>
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" className={"bg-white"}/>
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
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
        <Label>Password</Label>
        <Input placeholder="Enter your password"className={"bg-white"} />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>

                            <div className="flex flex-col gap-2">
                                <Button color="primary" className="w-full font-bold" type="submit">
                                    Create an account
                                </Button>
                                <Button className="justify-center w-full text-red-500 font-semibold" type="reset" variant="bordered">
                                    Reset
                                </Button>

                                <div className="relative my-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-100"></span>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or with email</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        variant="bordered"
                                        className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
                                    >
                                        <FaGoogle />
                                        Continue with Google
                                    </Button>
                                </div>

                                <div className="text-center pt-2">
                                    <p className="text-sm text-slate-500 font-medium">
                                        Already have an account?{' '}
                                        <Link
                                            href="/login"
                                            className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;