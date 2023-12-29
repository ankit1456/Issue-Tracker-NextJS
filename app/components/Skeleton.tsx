"use client";

import { useThemeContext } from "@radix-ui/themes";
import ReactSkeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = (props: any) => {
  const { appearance } = useThemeContext();

  return (
    <ReactSkeleton
      baseColor={appearance === "dark" ? "#444947" : "lightgray"}
      {...props}
    />
  );
};

export default Skeleton;
