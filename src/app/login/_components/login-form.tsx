"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginDTO, loginSchema } from "@/models/schema/register/login.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GradientLayout from "@/components/layouts/gradient-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useToast, { ToastType } from "@/hooks/use-toast";

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
  });

  const { trigger } = useToast();

  const router = useRouter();

  const login = async (data: LoginDTO) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!response?.error) {
      router.push("/home");
    } else {
      trigger(response.error, ToastType.Error);
    }
  };

  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((key) => {
        const error = errors[key as keyof typeof errors];
        if (error?.message) {
          trigger(error.message, ToastType.Error);
        }
      });
    }
  }, [errors]);

  return (
    <GradientLayout
      disabled
      className="items-center justify-center p-8"
      showNavbar={false}>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full flex flex-col  items-center">
          <img
            src="/logo-cropped.png"
            className="w-10/12 max-w-xs"
            alt=""
          />
          <p className="font-semibold text-lg pb-8">Sign in to continue</p>
        </div>
        <form
          onSubmit={handleSubmit(login)}
          className="w-full flex flex-col items-center gap-4">
          <Input
            {...register("email")}
            className="max-w-xl py-6"
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("password")}
            className="max-w-xl py-6"
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            className="w-full max-w-xl py-6 rounded-3xl font-bold">
            Sign In
          </Button>
          <Link href={"/register"}>
            <p className="text-xs font-medium text-gray-400">
              Don't have an account?
              <span className="text-primary font-bold">Sign Up</span>
            </p>
          </Link>
        </form>
      </div>
    </GradientLayout>
  );
};

export default LoginForm;

interface Props {
  children: ReactNode;
}
