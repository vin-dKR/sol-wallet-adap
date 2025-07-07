"use client"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Connection } from "@solana/web3.js"
import { useState } from "react"

interface ButtonProps {
    varient: "Test" | "Dev"
    noOfSol: number | null
}

const Button = ({ varient, noOfSol }: ButtonProps) => {
    const { connection } = useConnection()
    const { publicKey } = useWallet()

    const buttonType: boolean = varient === "Test"

    const [airdropLoading, setAirdropLoading] = useState<boolean>(false)
    const [airdropErr, setAirdropErr] = useState<string | null>(null)
    console.log(noOfSol)

    const handleAirdrop = async () => {
        if (!publicKey || !noOfSol || noOfSol <= 1) {
            setAirdropErr("no publicKey or put a +ve airdrop no.")
            return;
        }

        setAirdropLoading(true)
        setAirdropErr(null)

        try {
            const targetConnection = buttonType ? new Connection("https://api.testnet.solana.com", "confirmed") : connection

            const signature = await targetConnection.requestAirdrop(publicKey, noOfSol)
            const cnfTransaction = await targetConnection.confirmTransaction(signature, "confirmed")
            // Log successful airdrop
            console.log(`Successfully airdropped ${noOfSol} SOL to ${publicKey.toBase58()} on ${buttonType ? "Testnet" : "Devnet"}`);
        } catch (e: any) {
            setAirdropErr(`Airdrop successful on ${buttonType ? "Testnet" : "Devnet"}`)
        }
    }

    return (
        <div>
            <button
                className={`${buttonType ? "bg-green-600" : "bg-red-600"} green-600 h-10 w-25 rounded-md border border-white/20 cursor-pointer`}
                onClick={handleAirdrop}
            >
                {airdropLoading ? "Requesting..." : buttonType ? "Testent" : "Devnet"}
            </button>

            {airdropErr && <p className="text-red-500">{airdropErr}</p>}
        </div>
    )
}

export default Button
