'use client'

import { authClient } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';


const LoginPage = () => {
    const onSubmit = async  (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries());
    
        const { data, error } = await authClient.signIn.email({
            email: user.email, 
            password: user.password, 
            
               
        })
        console.log({data, error}) 
        if(data) {
            toast.success("LogIN successfully");
            redirect("/");
            
        }
        if(error) {
            toast.error("Error LogIn ,This email does not exist please signup : " + error.message);
        }
    
      }
     
    return (
       <div className='max-w-7xl mx-auto min-h-screen items-center mt-10'>
                      
                      <Card className='border bg-white '>
                        <div className='text-center m-5'>
                          <h2 className='text-2xl font-bold '>
                          Login
                      </h2>
                      <p className='mt-2 font-semibold text-slate-400'>
                          Start your adventure with wanderlust
                      </p>
                      </div>
                       <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4" >
          
           
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
              <Input placeholder="Enter your password" className={"bg-white"} />
              <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
              <FieldError />
            </TextField>
            <div className="flex flex-col gap-2">
              <Button  className={"w-full"} type="submit">
                
                LogIn
              </Button>
              <Button  className={'justify-center w-full text-red-400'} type="reset" variant="outline">
                Reset
              </Button>
            </div>

            <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Or with email</span>
                                    </div>
<div className="space-y-4">
                                    <Button
                                        type="button"
                                        // onClick={handleGoogleSignIn}
                                        variant="bordered"
                                        className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
                                    >
                                        <FaGoogle />
                                        Continue with Google
                                    </Button>
                                </div>   



            
          </Form>

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
           
                                    
          
                  </Card>
                  
                  </div>
    );
};

export default LoginPage;