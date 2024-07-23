// import { Post } from "@/components/post"
import React from 'react';
import EmailForm from '@/components/form-email';

export default function SignupPage() {
    return (
        <div className="flex justify-center items-center ">
            <div className="w-full max-w-lg">
                <h2 className="mb-6 text-center text-3xl font-extrabold">Sign Up</h2>
                <EmailForm />
            </div>
        </div>
    );
}
