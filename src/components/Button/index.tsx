import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
}
const Button: React.FC<IButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <button
      className="text-white bg-blue-900 w-full mt-4 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-3 text-center mr-2 mb-2 hover:scale-90"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
