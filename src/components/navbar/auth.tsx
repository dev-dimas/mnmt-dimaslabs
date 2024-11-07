'use client';

import { client } from '@/app/client';
import { LoaderCircle } from 'lucide-react';
import { useActiveWallet, useAutoConnect } from 'thirdweb/react';
import { Button } from '../ui/button';
import ConnectWalletButton from './connect-wallet-button';
import ProfileButton from './profile-button';

export default function Auth() {
  const { isLoading } = useAutoConnect({ client });
  const wallet = useActiveWallet();

  const activeAccount = wallet?.getAccount();

  if (isLoading && !activeAccount) {
    return (
      <Button className="text-black hover:bg-zinc-200 bg-zinc-200 font-semibold rounded-full shadow-none min-w-[90px]" variant="secondary">
        <LoaderCircle className="animate-spin" />
      </Button>
    );
  }

  if (!isLoading && activeAccount) return <ProfileButton walletId={wallet?.id} {...{ activeAccount }} />;

  return <ConnectWalletButton />;
}
