'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useCUSDBalance } from '@/hooks/useCUSDBalance'
import { useContractAmounts } from '@/hooks/useContractAmounts'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { cusdBalance, cusdIsLoading, cusdError } = useCUSDBalance()
  const { contractAmount, contractScaledAmount, contractIsLoading, contractError } = useContractAmounts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24" suppressHydrationWarning>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Impact Market Tester</h1>
      
        {isConnected ? (
          <div>
            <p className="mb-4">Connected: {address}</p>
            <p className="mb-4">
              cUSD Wallet Balance: {
                cusdIsLoading ? 
                  (<span className='text-gray-500'>Loading...</span>)
                : cusdError ?
                  (<span className='text-red-500'>Error: {cusdError}</span>)
                : 
                  (<span className='font-bold'>{parseFloat(cusdBalance).toFixed(2)} cUSD</span>)
              }
            </p>
            <p className="mb-4">
              Impact Market Deposit Amount: {
                contractIsLoading ? 
                  (<span className='text-gray-500'>Loading...</span>)
                : contractError ?
                  (<span className='text-red-500'>Error: {contractError}</span>)
                : 
                  (<span className='font-bold'>{parseFloat(contractAmount).toFixed(2)} cUSD</span>)
              }
            </p>
            <p className="mb-4">
              Impact Market Deposit Amount Scaled: {
                contractIsLoading ? 
                  (<span className='text-gray-500'>Loading...</span>)
                : contractError ?
                  (<span className='text-red-500'>Error: {contractError}</span>)
                : 
                  (<span className='font-bold'>{parseFloat(contractScaledAmount).toFixed(2)} cUSD</span>)
              }
            </p>
            <button onClick={() => disconnect()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Disconnect
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4">Connect your wallet to get started</p>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connect({ connector })}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Connect {connector.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}