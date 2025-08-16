import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigationItems = [
  { name: "Home", active: true },
  { name: "About", active: false },
  { name: "Contact", active: false },
  { name: "Support", active: false },
];

export const Main = (): JSX.Element => {
  return (
    <div className="bg-black grid justify-items-center [align-items:start] w-screen">
      <div className="bg-black overflow-hidden w-[1440px] h-[1024px]">
        <div className="relative w-[2000px] h-[2000px] top-[-488px] left-[-280px] bg-[url(/figmaAssets/ellipse-1.svg)] bg-[100%_100%]">
          <div className="absolute w-[1320px] h-[1320px] top-[340px] left-[340px] rounded-[659.77px] rotate-[-0.87deg] [background:radial-gradient(50%_50%_at_50%_50%,rgba(52,41,211,1)_0%,rgba(27,21,109,0)_100%)] opacity-20" />

          <header className="absolute w-[1265px] h-20 top-[533px] left-[368px]">
            <Button className="w-[50px] h-[50px] items-center justify-center gap-2.5 px-0 py-[5px] top-[11px] left-[1215px] bg-white rounded-[100px] flex absolute h-auto">
              <img
                className="relative w-[30px] h-[30px] object-cover"
                alt="Brightness"
                src="/figmaAssets/brightness-1.png"
              />
            </Button>

            <div className="absolute w-[942px] h-20 top-0 left-0">
              <nav className="flex-col w-[590px] h-[70px] items-end justify-around px-0 py-[22px] top-px left-[352px] bg-[#ffffff0d] rounded-[110px] border border-solid border-[#272727] backdrop-blur-[12.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(12.5px)_brightness(100%)] flex absolute">
                <NavigationMenu>
                  <NavigationMenuList className="flex w-[521px] h-[26px] items-center justify-end gap-[75px] px-[30px] py-0 relative">
                    {navigationItems.map((item, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          className={`${item.active ? "w-[62px] mt-[-0.50px] ml-[-60.00px] [font-family:'Ubuntu',Helvetica] font-bold text-[22px] relative text-white tracking-[0] leading-[normal]" : "relative w-[66px] mt-[-0.50px] opacity-80 [font-family:'Ubuntu',Helvetica] font-bold text-white text-[22px] tracking-[0] leading-[normal]"}`}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>

              <div className="absolute w-[134px] h-20 top-0 left-0">
                <div className="absolute w-14 h-20 -top-px left-0 rotate-180 [font-family:'Rubik_Mono_One',Helvetica] font-normal text-white text-[65px] tracking-[0] leading-[normal]">
                  B
                </div>

                <div className="flex-col w-[77px] h-[60px] items-center top-2.5 left-14 flex absolute">
                  <div className="relative self-stretch h-[27px] mt-[-1.00px] [font-family:'Russo_One',Helvetica] font-normal text-white text-[25px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                    reach
                  </div>

                  <div className="self-stretch h-[27px] [font-family:'Russo_One',Helvetica] font-normal text-[25px] text-center whitespace-nowrap relative text-white tracking-[0] leading-[normal]">
                    uster
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute w-[62px] h-[58px] top-[7px] left-[1130px] bg-[#ffffff1a] rounded-[100px]" />
          </header>

          <main className="flex flex-col items-center">
            <h1 className="absolute top-[753px] left-[561px] [-webkit-text-stroke:1px_#000000] [font-family:'Passion_One',Helvetica] font-normal text-white text-[150px] tracking-[0] leading-[normal] whitespace-nowrap">
              BREACH BUSTER
            </h1>

            <p className="absolute top-[899px] left-[661px] [font-family:'Passion_One',Helvetica] font-normal text-white text-[64px] text-center tracking-[0] leading-[normal]">
              Expose the leaks before they
              <br />
              expose you..
            </p>

            <Button className="absolute top-[1200px] left-[745px] [font-family:'Passion_One',Helvetica] font-normal text-white text-[64px] text-center tracking-[0] leading-[normal] whitespace-nowrap bg-transparent border-none p-0 h-auto hover:bg-transparent">
              Check For Breach Now
            </Button>
          </main>
        </div>
      </div>
    </div>
  );
};
