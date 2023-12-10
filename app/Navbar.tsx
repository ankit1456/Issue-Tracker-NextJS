"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14 shadow-md tracking-wide text-[.9rem]">
      <Link href="/">
        <AiFillBug className="text-violet-600 text-lg" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "bg-violet-600 p-1.5 px-2 text-white rounded-md":
                  link.href === currentPath,
                "text-zinc-950": link.href !== currentPath,
                "transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
