import Link from "next/link";
import { usePathname } from "next/navigation"; 
import router from "@/components/MainLayout/router";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="mx-4 mt-6">
      <ul className="space-y-2">
        {router.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.link === pathname;

          return (
            <li key={index}>
              <Link
                href={item.link}
                className={`flex items-center gap-3 rounded-md px-3 py-2 transition ${
                  isActive
                    ? "bg-green-500 text-white font-medium"
                    : "text-black hover:bg-green-500 hover:text-white"
                }`}
              >
                {item?.icon && <Icon />}
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
