import { clsx } from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export const Button = ({ variant = "primary", className, ...props }: Props) => (
    <button
        {...props}
        className={clsx(
            "w-full py-2 px-4 rounded font-medium transition-colors focus:outline-none",
            variant === "primary"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 hover:bg-gray-300",
            props.disabled && "opacity-50 cursor-not-allowed",
            className
        )}
    />
);