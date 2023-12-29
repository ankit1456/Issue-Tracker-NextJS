"use client";

import { Skeleton } from "@/app/components";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
  useThemeContext,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = ({ children }: PropsWithChildren) => {
  return (
    <nav className="border-b py-4 px-5 shadow-md tracking-wide text-[.9rem]">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug className="text-xl logo" />
            </Link>
            <NavLinks />
          </Flex>
          <Flex gap="4" align="center">
            <AuthStatus />
            {children}
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            size="2"
            radius="full"
            fallback="?"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.name}</Text>
          </DropdownMenu.Label>

          <DropdownMenu.CheckboxItem>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const { appearance } = useThemeContext();

  const currentPath = usePathname();

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
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            style={
              link.href === currentPath
                ? {
                    backgroundColor: "var(--accent-9)",
                    color:
                      appearance === "dark"
                        ? "var(--white-a11)"
                        : "var(--accent-1)",
                  }
                : {}
            }
            className={classnames({
              "nav-link": true,
              "p-1.5 px-2 rounded-md": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
