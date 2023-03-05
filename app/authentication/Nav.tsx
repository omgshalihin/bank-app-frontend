import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "./Logged";
import ThemeToggler from "../components/ThemeToggler";

const navigation = [
  { name: "Tech Stack", href: "#" },
  { name: "Features", href: "#" },
];

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex items-center justify-between py-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <Link href={"/"} className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            className="h-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </Link>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-semibold leading-6"
          >
            {item.name}
          </Link>
        ))}
        <ThemeToggler />
      </div>
      <div className="lg:hidden">
        <ThemeToggler />
      </div>
      <div className="lg:flex lg:flex-1 lg:justify-end">
        {!session ? (
          <Login />
        ) : (
          <Logged
            name={session.user?.name || ""}
            email={session.user?.email || ""}
          />
        )}
      </div>
    </nav>
  );
}
