/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { FakeWalletMultiButton as WalletMultiButton } from "./wallet/FakeWalletContext";
import { MobileMenuIcon } from "./Svglist";

export default function Sidebar() {
  const [mobilMenuState, setMobileMenuState] = useState<boolean>(true);
  return (
    <nav
      className={`${mobilMenuState ? "w-[80px]" : "w-[280px]"
        } lg:w-[280px] flex-col lg:flex fixed left-0 top-0 h-full z-50 border-r border-[#f0ece218] bg-[#1a1918] md:bg-transparent`}
    style={{ background: "linear-gradient(180deg, #1a1918 0%, #0e0d0c 100%)" }}
    >
      <div
        className={`flex lg:hidden w-full  ${mobilMenuState ? "justify-center" : "justify-end"
          } items-center cursor-pointer p-5`}
        onClick={() => setMobileMenuState(!mobilMenuState)}
      >
        <MobileMenuIcon color="white" />
      </div>
      <div
        className={`h-full overflow-y-auto scrollbar overflow-x-hidden ${mobilMenuState ? "space-y-4" : "lg:space-y-0"
          } `}
      >
        <div className={`px-6 lg:block ${mobilMenuState ? "hidden" : "block"}`}>
          <div className="flex items-center gap-3 pt-[28px]">
            <img src="/img/rialo-logo.jpg" alt="Rialo" className="w-9 h-9 rounded-lg object-contain" style={{ background: "#f0ece2" }} />
            <h1
              style={{ color: "#f0ece2" }}
              className="text-[26px] font-fontInter font-[900] tracking-widest"
            >
              RIALO
            </h1>
          </div>
          <div
            className={`w-full my-6 lg:block ${mobilMenuState ? "hidden" : "block"
              }`}
          >
            <WalletMultiButton />
          </div>
        </div>
        <p
          className={` font-normal text-[#ffffff] mt-6 border-[#ffffff32] pb-3 mx-6 lg:block ${mobilMenuState ? "hidden" : "block"
            }`}
        >
          Games
        </p>
        <div className="border-[1px] border-[#ffffff32] mx-4" />
        <Link href="/room/the-tower">
          <div className="flex my-4 hover:bg-[#ffffff12] hover:border-r-2 hover:border-[#D9D9D9] px-6 items-center">
            <img
              src="/img/tower.png"
              alt=""
              className="w-6 h-6 mr-4 object-contain"
            />
            <p
              className={`lg:block cursor-pointer font-bold text-[#ffffff] py-[15px] ${mobilMenuState ? "hidden" : "block"
                }`}
            >
              The Tower
            </p>
          </div>
        </Link>
        <Link href="/room/operators-hub">
          <div className="flex my-4 hover:bg-[#ffffff12] hover:border-r-2 hover:border-[#D9D9D9] px-6 items-center">
            <img
              src="/img/tower.png"
              alt=""
              className="w-6 h-6 mr-4 object-contain"
            />
            <p
              className={`lg:block cursor-pointer font-bold text-[#ffffff] py-[15px] ${mobilMenuState ? "hidden" : "block"
                }`}
            >
              Operators Hub
            </p>
          </div>
        </Link>
        <Link href="/room/infinite-rug">
          <div className="flex my-4 hover:bg-[#ffffff12] hover:border-r-2 hover:border-[#D9D9D9] px-6 items-center">
            <img
              src="/img/tower.png"
              alt=""
              className="w-6 h-6 mr-4 object-contain"
            />
            <p
              className={`lg:block cursor-pointer font-bold text-[#ffffff] py-[15px] ${mobilMenuState ? "hidden" : "block"
                }`}
            >
              Infinite Rug
            </p>
          </div>
        </Link>

        <p
          className={`font-normal text-[#ffffff] mt-6 border-[#ffffff32] pb-3 mx-6 lg:block ${mobilMenuState ? "hidden" : "block"
            }`}
        >
          Support
        </p>
        <div className="border-[1px] border-[#ffffff32] mx-4" />
        <a href="https://discord.gg/FKEMY22c">
          <div className="mt-4 flex hover:bg-[#ffffff12] hover:border-r-2 hover:border-[#D9D9D9] px-6 items-center">
            <img
              src="/img/discord.png"
              alt=""
              className="w-6 h-6 mr-4 object-contain"
            />
            <p
              className={`lg:block cursor-pointer font-bold text-[#ffffff] py-[15px] ${mobilMenuState ? "hidden" : "block"
                }`}
            >
              Discord
            </p>
          </div>
        </a>
      </div >
    </nav >
  );
}
