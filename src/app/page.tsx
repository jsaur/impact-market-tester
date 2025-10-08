'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useCUSDBalance } from '@/hooks/useCUSDBalance'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { balance, isLoading, error } = useCUSDBalance()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24" suppressHydrationWarning>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Impact Market Tester</h1>
      
        {isConnected ? (
          <div>
            <p className="mb-4">Connected: {address}</p>
            <p className="mb-4">
              cUSD Wallet Balance: {
                isLoading ? 
                  (<span className='text-gray-500'>Loading...</span>)
                : error ?
                  (<span className='text-red-500'>Error: {error}</span>)
                : 
                  (<span className='font-bold'>{parseFloat(balance).toFixed(2)} cUSD</span>)
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