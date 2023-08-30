import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { MAINNET_CHAINS, getInfuraUrlFor } from '../chains'

const [mainnet] = Object.keys(MAINNET_CHAINS).map(Number)
const [...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number)

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_V2_PROJECT_ID
export const [walletConnectV2, hooks] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: projectId,
        chains: [mainnet],
        rpc: getInfuraUrlFor('mainnet'),
        optionalChains,
        showQrModal: true,
      },
    })
)