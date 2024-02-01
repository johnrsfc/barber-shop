"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import {
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession();

  const handleLogoutClick = () => signOut();
  const handleLoginClick = () => signIn("google");
  return (
    <Card>
      <CardContent className="p-5 flex justify-between items-center">
        <Image src="/logo.png" alt="Barber Shop" height={22} width={120} />
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" size="icon">
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {data?.user ? (
              <div className="flex justify-between px-5 py-6 items-center">
                <div className="flex items-center gap-3 ">
                  <Avatar>
                    <AvatarImage
                      src={data.user?.image ?? ""}
                      className="rounded-full w-[50px] h-[50px]"
                    />
                  </Avatar>
                  <h2 className="font-bold">{data.user?.name}</h2>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleLogoutClick}
                >
                  <LogInIcon />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center gap-3">
                  <UserIcon size={32} />
                  <h2 className="font-bold">Olá, Faça seu login</h2>
                </div>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={handleLoginClick}
                >
                  <LogInIcon className="mr-3" size={18} />
                  Fazer Login
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3 px-5">
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/bookings">
                  <HomeIcon size={18} className="mr-3" />
                  Inicio
                </Link>
              </Button>
              {data?.user && (
                <Button variant="outline" className="justify-start">
                  <CalendarIcon size={18} className="mr-3" />
                  Agendamentos
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
