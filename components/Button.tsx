"use client"
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection } from "@solana/web3.js"
import { useState } from "react"

interface ButtonProps {
    varient: "Test" | "Dev"
    noOfSol: number | null
    customRpc: string
}

const Button = ({ varient, noOfSol, customRpc }: ButtonProps) => {
    const { publicKey } = useWallet()

    const buttonType: boolean = varient === "Test"

    const [airdropLoading, setAirdropLoading] = useState<boolean>(false)
    const [airdropErr, setAirdropErr] = useState<string | null>(null)
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
    console.log(noOfSol)

    const handleAirdrop = async () => {
        if (!publicKey || !noOfSol || noOfSol <= 1) {
            setAirdropErr("no publicKey or put a +ve airdrop no.")
            setShowErrorModal(true)
            return;
        }

        setAirdropLoading(true)
        setAirdropErr(null)
        setShowErrorModal(false)

        try {
            // Use custom RPC endpoint if provided, otherwise fall back to default
            const targetConnection = buttonType 
                ? new Connection(customRpc || "https://api.testnet.solana.com", "confirmed") 
                : new Connection(customRpc || "https://api.devnet.solana.com", "confirmed")

            const signature = await targetConnection.requestAirdrop(publicKey, noOfSol)
            await targetConnection.confirmTransaction(signature, "confirmed")
            // Log successful airdrop
            console.log(`Successfully airdropped ${noOfSol} SOL to ${publicKey.toBase58()} on ${buttonType ? "Testnet" : "Devnet"} using ${customRpc}`);
        } catch (error) {
            let errorMessage = `Airdrop unsuccessful on ${buttonType ? "Testnet" : "Devnet"}`;
            
            if (error instanceof Error) {
                errorMessage += `: ${error.message}`;
            } else if (typeof error === 'string') {
                errorMessage += `: ${error}`;
            } else if (error && typeof error === 'object' && 'message' in error) {
                errorMessage += `: ${(error as { message: string }).message}`;
            }
            
            setAirdropErr(errorMessage);
            setShowErrorModal(true);
            console.error('Airdrop error:', error);
        }
        setAirdropLoading(false)
    }

    const closeErrorModal = () => {
        setShowErrorModal(false)
        setAirdropErr(null)
    }

    return (
        <div>
            <button
                className={`${buttonType ? "bg-green-600" : "bg-red-600"} green-600 h-10 w-25 rounded-md border border-white/20 cursor-pointer`}
                onClick={handleAirdrop}
            >
                {airdropLoading ? "Requesting..." : buttonType ? "Testent" : "Devnet"}
            </button>

            {/* Error Modal */}
            {showErrorModal && airdropErr && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 border border-red-500/30 rounded-lg p-6 max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-red-400">Airdrop Error</h3>
                            <button 
                                onClick={closeErrorModal}
                                className="text-gray-400 hover:text-white text-xl"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-red-300 mb-4">{airdropErr}</p>
                        <div className="flex justify-end">
                            <button 
                                onClick={closeErrorModal}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Button
