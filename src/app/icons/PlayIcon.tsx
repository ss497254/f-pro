import * as React from "react";

export function PlayIcon(
  props: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
    <svg
      width={props.size || 20}
      height={props.size || 20}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM8 8C8 7.44772 8.44772 7 9 7H10C10.5523 7 11 7.44772 11 8V16C11 16.5523 10.5523 17 10 17H9C8.44772 17 8 16.5523 8 16V8ZM13 8C13 7.44772 13.4477 7 14 7H15C15.5523 7 16 7.44772 16 8V16C16 16.5523 15.5523 17 15 17H14C13.4477 17 13 16.5523 13 16V8Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}
