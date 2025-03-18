import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export type LucideSvgType = ForwardRefExoticComponent<
Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;