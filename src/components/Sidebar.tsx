import Image from "next/image";
import logo from "../../assets/dark-transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faFlag } from "@fortawesome/free-solid-svg-icons";

const links = [
  {
    name: "Fast Flags",
    link: "/",
    icon: faFlag,
  },
  {
    name: "Settings",
    link: "/",
    icon: faCog,
  },
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-80 p-4 bg-[#141414]">
      <Image
        alt="logo"
        className="bg-transparent mb-[12px]"
        src={logo}
        width={93}
        height={61.5}
        draggable="false"
      />
      <div className="px-3 mt-7">
        <p className="font-light text-sm text-[#686868]">Home</p>
        <div className="flex flex-col gap-3 mt-5">
          {links.map((link, id) => (
            <div className="flex flex-row items-center gap-5" key={id}>
              <FontAwesomeIcon
                icon={link.icon}
                fixedWidth
                size="lg"
                className="bg-[#292929]/50 p-2 rounded-lg"
              />
              <h3 className="font-semibold text-[#EFEFEF]">{link.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
