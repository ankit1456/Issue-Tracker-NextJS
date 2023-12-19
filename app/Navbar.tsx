"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
    },
  ];

  return (
    <nav className="border-b py-4 px-5 shadow-md tracking-wide text-[.9rem]">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>

          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    size="3"
                    radius="full"
                    fallback="?"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user?.name}</Text>
                  </DropdownMenu.Label>

                  <DropdownMenu.CheckboxItem>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.CheckboxItem>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}

            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
