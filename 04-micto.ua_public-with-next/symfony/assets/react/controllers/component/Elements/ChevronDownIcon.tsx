import React from "react";

export interface IPropsChevronDown {
  iconWidth?: number;
  iconHeigth?: number;
  iconColor?: string;
}

const ChevronDownIcon: React.FC<IPropsChevronDown> = ({
  iconWidth = 18,
  iconHeigth = 10,
  iconColor = "#000305",
}) => {
  return (
    <svg
      width={iconWidth}
      height={iconHeigth}
      viewBox="0 0 18 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.8976 1.3975L9.39763 8.8975C9.29216 9.00284 9.14919 9.062 9.00013 9.062C8.85107 9.062 8.7081 9.00284 8.60263 8.8975L1.10263 1.3975C1.00327 1.29087 0.949177 1.14983 0.951748 1.00411C0.954319 0.858382 1.01335 0.719343 1.11641 0.616284C1.21947 0.513224 1.35851 0.454189 1.50424 0.451618C1.64996 0.449047 1.791 0.50314 1.89763 0.6025L9.00013 7.70406L16.1026 0.6025C16.2093 0.50314 16.3503 0.449047 16.496 0.451618C16.6417 0.454189 16.7808 0.513224 16.8838 0.616284C16.9869 0.719343 17.0459 0.858382 17.0485 1.00411C17.0511 1.14983 16.997 1.29087 16.8976 1.3975Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default ChevronDownIcon;
