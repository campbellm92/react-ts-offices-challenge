interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string;
    isLoading?: boolean;
}

const styles = "bg-amber-300 hover:bg-amber-200 text-zinc-800 text-2xl font-extrabold p-2 cursor-pointer border-solid border-2 border-zinc-100"

const Button: React.FC<ButtonProps> = ({
    children,
    isLoading = false,
    ...props
}) => {
    return (
        <button {...props} className={styles}>{isLoading ? "..." : children}</button>
    )
}

export default Button