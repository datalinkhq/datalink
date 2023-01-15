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

const Login: NextPageWithLayout = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

  return (
    <div className="!font-inter">
      <div className="absolute w-screen h-screen bg-[url('https://lbda.net/dLe2.png')] dark:bg-[url('https://lbda.net/yWNP.png')] bg-cover bg-no-repeat bg-center opacity-[.15]" />
      <div className="absolute right-8 top-8 cursor-pointer group">
        {themeSwitch()}
      </div>

      <div className="h-screen flex">
        <motion.div
          className="relative bg-primary-white dark:bg-primary rounded-xl px-[92px] py-[104px] m-auto z-50 scale-95"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute top-7 left-7 cursor-pointer group">
            <FontAwesomeIcon
              icon={faArrowLeft}
              fixedWidth
              size="2xl"
              className="text-black dark:text-white group-hover:text-gray-800 dark:group-hover:text-slate-200 transition-colors"
            />
          </div>
          <div className="w-[475px]">
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
                👋 Welcome back!
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
              <div className="space-y-[24px]">
                <label className="block">
                  <span className="text-black/75 dark:text-white/75">
                    Username
                  </span>
                  <input
                    type="text"
                    className="block mt-1 w-full rounded-xl caret-black dark:caret-white bg-secondary-white dark:bg-secondary border-black/10 dark:border-white/10 placeholder:text-black/[45%] dark:placeholder:text-white/[45%] !outline-[0px] focus:ring-0 focus:border-black/30 dark:focus:border-white/30 transition-all"
                    placeholder="DevComp"
                  ></input>
                </label>
                <label className="block">
                  <span className="text-black/75 dark:text-white/75">
                    Password
                  </span>
                  <input
                    type="text"
                    className="block mt-1 w-full rounded-xl caret-black dark:caret-white bg-secondary-white dark:bg-secondary border-black/10 dark:border-white/10 placeholder:text-black/[45%] dark:placeholder:text-white/[45%] placeholder:text-xs !outline-[0px] focus:ring-0 focus:border-black/30 dark:focus:border-white/30 transition-all"
                    placeholder="●●●●●●●●●"
                  ></input>
                </label>
                <button className="block w-full rounded-xl text-white dark:text-black bg-[#4469A5] dark:bg-[#C3CFE2] font-bold p-2 text-xl hover:scale-[0.98] ease-in-out transition-transform">
                  Login
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
