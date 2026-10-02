import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
};

export { Button };
