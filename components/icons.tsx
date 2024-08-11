import {
  LucideProps,
  Moon,
  SunMedium,
  type icons as LucideIcon,
} from "lucide-react";
import Image from "next/image";


export type Icon = typeof LucideIcon;


export const Icons = {
  sun: SunMedium,
  moon: Moon,
  logo: (props: LucideProps) => (

    <Image
      src="/logo.png" alt="ToDo Wevy" width={35} height={80} id="logo" priority
    />
  ),
};
