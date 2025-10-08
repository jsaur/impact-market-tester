'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { BrowserProvider, Contract, parseUnits } from 'ethers'
import { IMPACT_MARKET_ABI } from '@/lib/impactMarketABI'
import { CUSD_ADDRESS, IMPACT_MARKET_ADDRESS } from '@/lib/constants'

export function useWithdraw() {
    const { address } = useAccount()
    const [withdrawTxHash, setWithdrawTxHash] = useState<string>('')
    const [withdrawIsLoading, setIsLoading] = useState(false)
    const [withdrawError, setError] = useState<string|null>(null)

    const withdrawAll = async (amountInWei: bigint) => {
            if (!address) {
                setError('No wallet connected')
                return
            }
                
            if (!amountInWei || amountInWei <= BigInt(0)) {
                setError('No amount to withdraw')
                return
            }

            try {
                setIsLoading(true)
                setError(null)
                const provider = new BrowserProvider(window.ethereum)
                const signer = await provider.getSigner()
                const impactMarketContract = new Contract(IMPACT_MARKET_ADDRESS, IMPACT_MARKET_ABI, signer)
                
                // Debugging
                console.log('About to withdraw:', {
                    contract: IMPACT_MARKET_ADDRESS,
                    token: CUSD_ADDRESS,
                    amount: amountInWei.toString(),
                    from: address
                })
                
                const tx = await impactMarketContract.withdraw(CUSD_ADDRESS, amountInWei, { gasLimit: 500000 })
                setWithdrawTxHash(tx.hash)
                await tx.wait()
                return tx
            } catch (err) {
                console.error('Error withdrawing:', err)
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setIsLoading(false)
            }
        }
    
        return { withdrawAll, withdrawTxHash, withdrawIsLoading, withdrawError }
}