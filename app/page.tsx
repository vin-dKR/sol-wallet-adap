export default function Home() {
    return (
        <div className="h-screen bg-zinc-900 text-white w-full text-center flex flex-col justify-center items-center">
            <div>
                <h1 className="text-7xl text-bold">Sol Faucet</h1>
                <input
                    type="text"
                    placeholder="enter your address"
                    className="bg-white/20 w-100 h-10 rounded-md border border-white/10 px-2"
                />
            </div>
        </div>
    );
}
