'use client';

import { client } from '@/app/client';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { ConnectEmbed, lightTheme } from 'thirdweb/react';
import { createWallet } from 'thirdweb/wallets';
import { Button } from '../ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';

const wallets = [
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('me.rainbow'),
  createWallet('walletConnect'),
];
const customTheme = lightTheme({ colors: { borderColor: 'transparent' } });

type Props = {
  title?: string;
  isDismissable?: boolean;
  hideClose?: boolean;
  hideTriggerButton?: boolean;
};
export default function ConnectWalletButton({
  title = 'Connect wallet',
  isDismissable = false,
  hideClose = false,
  hideTriggerButton = false,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(hideTriggerButton);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} modal={true}>
      {!hideTriggerButton && (
        <DialogTrigger asChild>
          <Button
            className="text-black hover:bg-zinc-200 bg-zinc-200 font-semibold rounded-full shadow-none"
            variant="secondary"
          >
            Connect
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className="px-0 sm:max-w-[425px]"
        aria-describedby="Connect wallet"
        onInteractOutside={(e) => {
          e.preventDefault();
          if (isDismissable) setIsModalOpen(false);
        }}
        hideClose={hideClose}
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-center">{title}</DialogTitle>
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
