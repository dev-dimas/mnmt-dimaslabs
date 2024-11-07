import { Account, WalletId } from 'thirdweb/wallets';
import { Button } from '../ui/button';
import { memo } from 'react';
import { useWalletDetailsModal, useWalletImage } from 'thirdweb/react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { client } from '@/app/client';

type Props = {
  activeAccount: Account;
  walletId: WalletId | undefined;
};

function ProfileButton({ activeAccount, walletId }: Props) {
  const { data: walletImage } = useWalletImage(walletId);
  const detailsModal = useWalletDetailsModal();

  function handleClick() {
    detailsModal.open({ client, theme: 'light' });
  }

  return (
    <Button
      className="text-zinc-500 hover:bg-white bg-white font-semibold rounded-full shadow-none w-full outline outline-2 outline-zinc-200 max-[396px]:px-2"
      variant="secondary"
      onClick={handleClick}
    >
      {walletImage ? (
        <Image src={walletImage} alt="Wallet image" width={100} height={100} className="h-5 w-5 object-cover rounded-full" />
      ) : (
        <Skeleton className="h-5 w-5 rounded-full" />
      )}
      <p className="max-[396px]:hidden">
        {activeAccount.address.slice(0, 4)}...{activeAccount.address.slice(-3)}
      </p>
    </Button>
  );
}

export default memo(ProfileButton);
