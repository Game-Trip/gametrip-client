import React from "react";
import { css, cx } from "@emotion/css";
import { Link, useNavigate } from "react-router-dom";

export const Button = ({
  to,
  isRouterButton = false,
  children,
  ref,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  to?: string;
  isRouterButton?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <button
      ref={ref}
      {...props}
      // eslint-disable-next-line react/prop-types
      className={cx(styles.topButton, props.className)}
      // onClick, navigate to "to"
      onClick={() => {
        navigate(to ?? "/");
      }}
    >
      {isRouterButton ? (
        <Link style={{ textDecoration: "none", color: "white" }} to={to ?? "/"}>
          {children}
        </Link>
      ) : (
        children
      )}
    </button>
  );
};
const styles = {
  topButton: css`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300px;
    font-size: 28px;
    line-height: 33px;
    border-radius: 8px;
    padding: 10px 5px;
    transition: 0.5s;
    text-decoration: none;
    color: "white";
    background-color: #74c499;
    border: none;
    :hover {
      background-color: #65aa85;
      cursor: pointer;
      transform: translateY(-5px);
    }
  `,
};
