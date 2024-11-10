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

  const walletId = wallet?.id;
  const activeAccountAddress = wallet?.getAccount()?.address;

  if (isLoading && !activeAccountAddress) {
    return (
      <Button
        className="text-black hover:bg-zinc-200 bg-zinc-200 disabled:opacity-100 font-semibold rounded-full shadow-none min-w-[90px]"
        variant="secondary"
        disabled
      >
        <LoaderCircle className="animate-spin" />
      </Button>
    );
  }

  if (!isLoading && activeAccountAddress)
    return <ProfileButton {...{ activeAccountAddress, walletId }} />;

  return <ConnectWalletButton isDismissable />;
}
