"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { SheetTrigger, Sheet, SheetContent } from "./ui/sheet";
import SideMenu from "./side-menu";

const Header = () => {
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
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
