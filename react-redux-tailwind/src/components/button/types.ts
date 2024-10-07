import { TTailwindString } from "@frontend/tailwindcss-classnames";

export type ButtonProps = {
  variant: ButtonVariant
  size: 'sm' | 'md' | 'lg'
  children: any
  classNames?: TTailwindString
  onClick?: React.MouseEventHandler<HTMLButtonElement>
};

export type ButtonVariant = 'contained' | 'outlined' | 'text'