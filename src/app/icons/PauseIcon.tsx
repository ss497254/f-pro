import * as React from "react";

export function PauseIcon(
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM9.64109 7.19733C9.14132 6.89192 8.5 7.2516 8.5 7.83729V16.1627C8.5 16.7484 9.14132 17.1081 9.64109 16.8027L16.4528 12.64C16.9313 12.3475 16.9313 11.6525 16.4528 11.36L9.64109 7.19733Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
