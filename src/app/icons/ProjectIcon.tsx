import * as React from "react";

export function ProjectIcon(
  props: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
    <svg
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5,22H19a3,3,0,0,0,3-3V9a3,3,0,0,0-3-3H17V4a2,2,0,0,0-2-2H9A2,2,0,0,0,7,4V6H5A3,3,0,0,0,2,9V19A3,3,0,0,0,5,22ZM18,8h1a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H18ZM9,4h6V6H9ZM8,8h8V20H8ZM4,9A1,1,0,0,1,5,8H6V20H5a1,1,0,0,1-1-1Z"></path>
    </svg>
  );
}
