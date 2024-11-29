"use client";

import { useSidebar } from "@repo/ui/components/sidebar";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

const NavLogo = () => {
  const { open } = useSidebar();
  const { theme } = useTheme();

  return (
    <div className="p-2 flex gap-1 items-end">
      <Image src={"/images/logo-mini.svg"} alt="Logo" height={40} width={40} />
      <motion.div
        animate={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={`/images/logo-text-${theme || "light"}.svg`}
          alt="Logo"
          height={25}
          width={110}
        />
      </motion.div>
    </div>
  );
};

export default NavLogo;
