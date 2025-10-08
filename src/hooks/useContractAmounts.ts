'use client'

import { useState, useEffect } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { IMPACT_MARKET_ABI } from '@/lib/impactMarketABI'
import { CUSD_ADDRESS, IMPACT_MARKET_ADDRESS } from '@/lib/constants'

export function useContractAmounts() {
    const { address, isConnected } = useAccount()
    const publicClient = usePublicClient()
    const [contractAmount, setAmount] = useState<string>('0')
    const [contractScaledAmount, setScaledAmount] = useState<string>('0')
    const [contractIsLoading, setIsLoading] = useState(false)
    const [contractError, setError] = useState<string|null>(null)

    useEffect(() => {
        async function fetchContractAmounts() {
            if (!address || !isConnected || !publicClient) {
                setAmount('0')
                setScaledAmount('0')
                return
            }

            try {
                setIsLoading(true)
                setError(null)
                const provider = new BrowserProvider(window.ethereum)
                const impactMarketContract = new Contract(IMPACT_MARKET_ADDRESS, IMPACT_MARKET_ABI, provider)
                const contractResult = await impactMarketContract.tokenDepositor(CUSD_ADDRESS, address)
                console.log(contractResult)
                // Note not entirely sure what the scaled amount refers to
                const amountFormatted = formatUnits(contractResult[0], 18)
                const scaledAmountFormatted = formatUnits(contractResult[1], 18)
                setAmount(amountFormatted)
                setScaledAmount(scaledAmountFormatted)
            } catch (err) {
                console.error('Error fetching contract amounts:', err)
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setIsLoading(false)
            }
        }

        fetchContractAmounts()
    }, [address, isConnected, publicClient])

    return { contractAmount, contractScaledAmount, contractIsLoading, contractError }
}