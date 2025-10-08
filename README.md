This is a simple web app to try and withdraw some stuck balance on an Impact Market contract.

The underlying deposit contract is here:
https://celo.blockscout.com/address/0x0A547bdE3FB47Bd59A78B0A285dB07C3Fce8b8B6?tab=contract

And the web interface to withdraw the balance is here (currently broken):
https://www.impactmarket.com/crypto-hub

You can see the various failed withdraw attempts here:
https://celo.blockscout.com/address/0x0A547bdE3FB47Bd59A78B0A285dB07C3Fce8b8B6?tab=txs

Used [Next.js](https://nextjs.org) to bootstrap the project with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you have a balance on the contract it should show it, and the Withdraw All button should attempt
to withdraw the full deposited amount

## Results
Still getting tx errors, so my deposit is still stuck
