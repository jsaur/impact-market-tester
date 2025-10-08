'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24" suppressHydrationWarning>
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Impact Market Tester</h1>
      
        {isConnected ? (
          <div>
            <p className="mb-4">Connected: {address}</p>
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