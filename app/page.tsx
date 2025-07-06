import Button from "@/components/Button";

export default function Home() {
    return (
        <div className="h-screen bg-zinc-900 text-white w-full text-center flex flex-col justify-center items-center">
            <div className="flex flex-col gap-3 md:gap-6 items-center px-2 md:px-0">

                <div className="flex flex-col items-center">
                    <h1 className="text-6xl md:text-9xl text-bold font-ttcb">SOL Faucet</h1>
                    <h2 className="text-sm md:text-2xl text-indigo-400 font-ttcm">Have a drink! The premium faucet for Solana Devnet and Testnet.</h2>
                </div>

                <input
                    type="text"
                    placeholder="enter your address"
                    className="bg-white/20 w-full md:w-160 h-10 text-xl rounded-md border border-white/10 px-2 focus:outline-3 focus:outline-offset-2 focus:outline-blue-800/30"
                />

                <div className="flex flex-col md:flex-row gap-2 items-center">
                    <div className="flex gap-2 items-center">
                        <span>Airdrop</span>
                        <input
                            type="number"
                            className="bg-white/20 w-14 h-10 text-xl rounded-md border border-white/10 px-2 focus:outline-3 focus:outline-offset-2 focus:outline-blue-800/30"
                        />
                        <span>SOL to</span>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <Button varient="Main" />
                        <Button varient="Dev" />
                    </div>
                </div>
            </div>
        </div>
    );
}
