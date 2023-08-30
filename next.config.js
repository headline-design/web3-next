/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    infuraKey: process.env.NEXT_PUBLIC_INFURA_KEY,
    alchemyKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    magicKey: process.env.NEXT_PUBLIC_MAGIC_KEY,
walletConnectKey: process.env.NEXT_PUBLIC_WALLET_CONNECT_KEY,
  },
}

module.exports = nextConfig
