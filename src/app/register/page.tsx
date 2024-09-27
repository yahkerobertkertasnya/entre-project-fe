import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Register: React.FC = () => {
    return (
        <>
            <div className="w-full flex justify-center">
                <p className="font-semibold text-lg">Sign up to start your journey</p>
            </div>
            <form action="" className="w-full flex flex-col items-center gap-4">
                <Input className="py-6" type="text" placeholder="Name" />
                <Input className="py-6" type="text" placeholder="Email" />
                <Input className="py-6" type="password" placeholder="Password" />
                <Input className="py-6" type="password" placeholder="Confirm Password" />
                <Input className="py-6" type="text" placeholder="Phone Number" />
                <Button className="w-full py-6 rounded-3xl">Sign Up</Button>
                <p className="text-xs font-medium text-gray-400">
                    Already have an account?
                    <span className="text-primary font-bold">Sign In</span>
                </p>
            </form>
        </>
    )
}

export default Register;