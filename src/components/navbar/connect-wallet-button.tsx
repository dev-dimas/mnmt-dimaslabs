'use client';

import { client } from '@/app/client';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { ConnectEmbed, lightTheme } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';
import { Button } from '../ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';

const wallets = [createWallet('io.metamask'), createWallet('com.coinbase.wallet'), createWallet('me.rainbow'), createWallet('walletConnect')];
const customTheme = lightTheme({ colors: { borderColor: 'transparent' } });

export default function ConnectWalletButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="text-black hover:bg-zinc-200 bg-zinc-200 font-semibold rounded-full shadow-none" variant="secondary">
          Connect
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 sm:max-w-[425px]" aria-describedby="Connect wallet">
        <DialogHeader>
          <DialogTitle className="font-bold text-center">Connect wallet</DialogTitle>
        </DialogHeader>
        <ConnectEmbed
          client={client}
          appMetadata={{
            name: 'MintMate',
            description: 'A website dedicated to creating and minting NFTs.',
          }}
          wallets={wallets}
          theme={customTheme}
          style={{ width: '100%' }}
          showAllWallets={false}
          showThirdwebBranding={false}
          onConnect={() => setIsModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
