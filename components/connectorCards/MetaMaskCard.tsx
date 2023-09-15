import { useEffect, useState } from 'react'
import {sendMoon, sendMoonContract} from '../../sendMoon.mjs'
import {ethers} from 'ethers'

import { hooks, metaMask } from '../../connectors/metaMask'
import { Card } from '../Card'

declare let window:any





const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

export default function MetaMaskCard() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [metaData, setMetaData] = useState({provider: undefined, signer: undefined})

  const [error, setError] = useState(undefined)

  async function testEthers(){

    const provider = new ethers.BrowserProvider(window.ethereum);
    // It will prompt user for account connections if it isnt connected
    const signer = await provider.getSigner();
    console.log("Account:", await signer.getAddress());

    let metaData = {
      signer: signer,
      provider: provider
    }
    console.log(metaData)
    setMetaData({...metaData})

  
  }

  // attempt to connect eagerly on mount
  useEffect(() => {
    testEthers()
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask')
    })
  }, [])

  return (
    <><Card
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
    />
    <h3>{JSON.stringify(metaData)}</h3>
    <button onClick={async ()=>{
      let data = await  sendMoon(1234,metaData.signer,metaData.signer.address,metaData.provider)
    }}>Test Send $$$</button>
    <button onClick={async ()=>{
      let data = await  sendMoonContract(metaData.signer,metaData.provider)
    }}>Test Send COMMETRACT</button>
    </>
  )
}
