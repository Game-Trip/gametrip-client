import React from "react";
import { css, cx } from "@emotion/css";
import { Link } from "react-router-dom";

export const Button2 = ({
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
  return isRouterButton ? (
    <button
      ref={ref}
      {...props}
      className={cx(styles.topButton, props.className)}
    >
      <Link style={{ textDecoration: "none", color: "white" }} to={to ?? "/"}>
        {children}
      </Link>
    </button>
  ) : (
    <button
      ref={ref}
      {...props}
      className={cx(styles.topButton, props.className)}
    >
      {children}
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
      transform: translateY(5px);
    }
  `,
};
