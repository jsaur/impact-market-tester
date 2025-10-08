'use client'

import { useState, useEffect } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { ERC20_ABI } from '@/lib/erc20ABI'
import { CUSD_ADDRESS } from '@/lib/constants'

export function useCUSDBalance() {
    const { address, isConnected } = useAccount()
    const publicClient = usePublicClient()
    const [cusdBalance, setBalance] = useState<string>('0')
    const [cusdIsLoading, setIsLoading] = useState(false)
    const [cusdError, setError] = useState<string|null>(null)

    useEffect(() => {
        async function fetchBalance() {
            if (!address || !isConnected || !publicClient) {
                setBalance('0')
                return
            }

            try {
                setIsLoading(true)
                setError(null)

                // Convert viem public client to ethers provider
                const provider = new BrowserProvider(window.ethereum)

                const cusdContract = new Contract(CUSD_ADDRESS, ERC20_ABI, provider)
                const balanceWei = await cusdContract.balanceOf(address)
                const balanceFormatted = formatUnits(balanceWei, 18)
                setBalance(balanceFormatted)
            } catch (err) {
                console.error('Error fetching cUSD balance:', err)
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setIsLoading(false)
            }
        }
    
        fetchBalance()
    }, [address, isConnected, publicClient])

    return { cusdBalance, cusdIsLoading, cusdError }
}