interface ButtonProps {
    varient: "Main" | "Dev"
}

const Button = ({ varient }: ButtonProps) => {
    const buttonType: boolean = varient === "Main"

    return (
        <button className={`${buttonType ? "bg-green-600" : "bg-red-600"} green-600 h-10 w-25 rounded-md border border-white/20 cursor-pointer`}>
            {buttonType ? "Mainnet" : "Devnet"}
        </button>
    )
}

export default Button
