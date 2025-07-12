# Local Solana Validator Setup

## Prerequisites

1. **Install Solana CLI** (if not already installed):
   ```bash
   sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
   ```

2. **Add Solana to your PATH**:
   ```bash
   export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
   ```

## Running a Local Validator

### Step 1: Start the Local Validator
```bash
solana-test-validator
```

This will start a local validator on `http://localhost:8899`

### Step 2: Configure Your Wallet
1. Set your wallet to use the local validator:
   ```bash
   solana config set --url http://localhost:8899
   ```

2. Create a new wallet (if needed):
   ```bash
   solana-keygen new
   ```

### Step 3: Fund Your Wallet
```bash
solana airdrop 10
```

### Step 4: Use in Your App
1. In your app, set the RPC endpoint to: `http://localhost:8899`
2. Click the airdrop buttons to test

## Alternative RPC Endpoints

You can also use other RPC endpoints:

- **Local Validator**: `http://localhost:8899`
- **Devnet**: `https://api.devnet.solana.com`
- **Testnet**: `https://api.testnet.solana.com`
- **Mainnet**: `https://api.mainnet-beta.solana.com`

## Troubleshooting

### Validator Won't Start
- Check if port 8899 is already in use
- Try: `lsof -i :8899` to see what's using the port
- Kill the process or use a different port

### Connection Issues
- Ensure your firewall allows connections to port 8899
- Check that the validator is running: `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'`

### Airdrop Fails
- Local validators have unlimited airdrops
- If it fails, restart the validator and try again

## Benefits of Local Validator

1. **No Rate Limits**: Unlimited airdrops
2. **Fast**: No network latency
3. **Private**: Your transactions don't affect public networks
4. **Free**: No real SOL needed
5. **Reliable**: No network congestion or downtime

## Stopping the Validator

Press `Ctrl+C` in the terminal where the validator is running. 