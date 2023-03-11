/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import type { NextPageWithLayout } from "../types";
import logo from "../../assets/dark-transparent.png";
import logoBlack from "../../assets/light-transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { setCookie } from "nookies";

type FormInput = {
  username: string;
  password: string;
};

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [authenticating, setAuthenticating] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeSwitch = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    switch (currentTheme) {
      case "dark":
        return (
          <FontAwesomeIcon
            icon={faSun}
            fixedWidth
            size="xl"
            className="group-hover:text-slate-200 transition-colors"
            onClick={() => setTheme("light")}
          />
        );
      case "light":
        return (
          <FontAwesomeIcon
            icon={faMoon}
            fixedWidth
            size="xl"
            className="group-hover:text-slate-200 transition-colors"
            onClick={() => setTheme("dark")}
          />
        );
    }
  };

  const login: SubmitHandler<FormInput> = async (data) => {
    setAuthenticating(true);
    setError(null);

    try {
      const { data: idData } = await axios.post("/api/id", {
        username: data.username,
      });

      const { data: iatData } = await axios.post("/api/jwt/iat", {
        id: idData.id,
      });

      const { data: signedData } = await axios.post("/api/jwt/sign", {
        payload: data.password,
        iat: iatData.iat,
      });

      const { data: authData } = await axios.post("/api/auth", {
        id: idData.id,
        token: signedData.signedToken,
      });

      setCookie(null, "datalink-id", idData.id, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      setCookie(null, "datalink-token", signedData.signedToken, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      setCookie(null, "datalink-session", authData.session_key, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      router.push("/");
    } catch (error: any) {
      setAuthenticating(false);
      if (!error.response.data) return setError("Unexpected error, try again");
      return setError("Invalid credentials");
    }
  };

  return (
    <div className="!font-inter">
      <div className="absolute w-screen h-screen bg-[url('https://lbda.net/dLe2.png')] dark:bg-[url('https://lbda.net/yWNP.png')] bg-cover bg-no-repeat bg-center opacity-[.15]" />
      <div className="absolute right-8 top-8 cursor-pointer group">
        {themeSwitch()}
      </div>

      <div className="h-screen flex">
        <motion.div
          className="flex md:flex-none relative bg-primary-white dark:bg-primary rounded-none md:rounded-xl w-full min-h-screen md:w-fit md:h-fit md:min-h-fit px-16 md:px-[92px] py-[104px] m-auto z-50 scale-95"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute top-7 left-7 cursor-pointer group">
            <FontAwesomeIcon
              icon={faArrowLeft}
              fixedWidth
              size="2xl"
              className="text-black dark:text-white group-hover:text-gray-800 dark:group-hover:text-slate-200 transition-colors"
              onClick={() => router.back()}
              role="button"
            />
          </div>
          <div className="w-full md:w-[475px] m-auto">
            <Image
              alt="logo"
              className="bg-transparent mx-auto mb-[12px]"
              src={mounted ? (theme === "dark" ? logo : logoBlack) : ""}
              width={186}
              height={123}
              draggable="false"
            />
            <div className="mb-6">
              <h1 className="text-black font-bold text-[40px] leading-[48px] dark:text-white">
                <div className="inline-block animate-wave">👋</div> Welcome
                back!
              </h1>
              <p className="text-black font-normal text-xl leading-[24px] opacity-75 dark:text-white">
                Sign in
              </p>
            </div>
            <div className="space-y-5">
              <div>
                <a
                  href="#"
                  className="block bg-secondary-white dark:bg-secondary text-black dark:text-white rounded-lg p-2 font-bold text-center border border-black/10 dark:border-white/10 hover:bg-[#b3b3b3] dark:hover:bg-[#2a2a2a] transition-colors ease-in-out"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    fixedWidth
                    className="mr-1"
                    size="lg"
                  />
                  <span>Sign in with GitHub</span>
                </a>
              </div>
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-black/20 dark:border-[#D9D9D9]/[18%]" />
                <span className="flex-shirk mx-5 text-black/20 dark:text-[#D9D9D9]/[18%]">
                  OR
                </span>
                <div className="flex-grow border-t border-black/20 dark:border-[#D9D9D9]/[18%]" />
              </div>
              <form className="space-y-[24px]" onSubmit={handleSubmit(login)}>
                <label className="block">
                  <span className="text-black/75 dark:text-white/75">
                    Username
                  </span>
                  <input
                    type="text"
                    className="block mt-1 w-full rounded-xl caret-black dark:caret-white bg-secondary-white dark:bg-secondary border-black/10 dark:border-white/10 placeholder:text-black/[45%] dark:placeholder:text-white/[45%] !outline-[0px] focus:ring-0 focus:border-black/30 dark:focus:border-white/30 transition-all disabled:cursor-not-allowed disabled:opacity-80"
                    placeholder="DevComp"
                    disabled={authenticating}
                    {...register("username", { required: true })}
                  ></input>
                </label>
                <div className="flex flex-col !mt-2">
                  {errors.username && (
                    <span className="text-red-600 font-semibold opacity-100">
                      This field is required
                    </span>
                  )}
                </div>
                <label className="block">
                  <span className="text-black/75 dark:text-white/75">
                    Password
                  </span>
                  <input
                    type="password"
                    className="block mt-1 w-full rounded-xl caret-black dark:caret-white bg-secondary-white dark:bg-secondary border-black/10 dark:border-white/10 placeholder:text-black/[45%] dark:placeholder:text-white/[45%] placeholder:text-xs !outline-[0px] focus:ring-0 focus:border-black/30 dark:focus:border-white/30 transition-all disabled:cursor-not-allowed disabled:opacity-80"
                    placeholder="●●●●●●●●●"
                    disabled={authenticating}
                    {...register("password", { required: true })}
                  ></input>
                </label>
                <div className="flex flex-col !mt-2">
                  {errors.password && (
                    <span className="text-red-600 font-semibold opacity-100">
                      This field is required
                    </span>
                  )}
                  {error && (
                    <span className="text-red-600 font-semibold opacity-100">
                      {error}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={authenticating}
                  className="block w-full rounded-xl text-white dark:text-black bg-[#4469A5] dark:bg-[#C3CFE2] font-bold p-2 text-xl hover:scale-[0.98] ease-in-out transition-all disabled:cursor-not-allowed disabled:opacity-80"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
