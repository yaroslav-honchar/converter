import React, { SVGProps } from "react"

export const BehanceIcon: React.FC<SVGProps<SVGElement>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 18V6H7.5C8.29565 6 9.05871 6.31607 9.62132 6.87868C10.1839 7.44129 10.5 8.20435 10.5 9C10.5 9.79565 10.1839 10.5587 9.62132 11.1213C9.05871 11.6839 8.29565 12 7.5 12C8.29565 12 9.05871 12.3161 9.62132 12.8787C10.1839 13.4413 10.5 14.2044 10.5 15C10.5 15.7956 10.1839 16.5587 9.62132 17.1213C9.05871 17.6839 8.29565 18 7.5 18H3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12H7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 13H21C21 12.0717 20.6313 11.1815 19.9749 10.5251C19.3185 9.86875 18.4283 9.5 17.5 9.5C16.5717 9.5 15.6815 9.86875 15.0251 10.5251C14.3687 11.1815 14 12.0717 14 13ZM14 13V15C14.1031 15.7487 14.4459 16.4438 14.9769 16.9816C15.5079 17.5193 16.1987 17.8707 16.946 17.9833C17.6933 18.0958 18.457 17.9634 19.1228 17.606C19.7887 17.2485 20.3209 16.6851 20.64 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 6H21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
