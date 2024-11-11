'use client';

import { client } from '@/app/client';
import ConnectWalletButton from '@/components/navbar/connect-wallet-button';
import { useMintStepStatus } from '@/store/useMintStepStatus';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useActiveWallet, useAutoConnect } from 'thirdweb/react';
import MintDone from './mint-done';
import MintNft from './mint-nft';
import MintSteps from './mint-step';
import NFTUploader from './nft-uploader';

export default function Page() {
  const { isLoading } = useAutoConnect({ client });
  const wallet = useActiveWallet();
  const { stepStatus, setStepStatus } = useMintStepStatus();

  useEffect(() => {
    setStepStatus(localStorage.getItem('unfinished_ipfs_url') ? 'Mint' : 'Upload');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !stepStatus) {
    return (
      <div className="flex justify-center items-center min-h-full">
        <LoaderCircle className="animate-spin -mt-[20%]" size={28} />;
      </div>
    );
  }

  if (!wallet)
    return <ConnectWalletButton title="Connect your wallet first" hideClose hideTriggerButton />;

  return (
    <div className="flex flex-col items-center mx-auto min-h-full mt-10 w-full max-w-[90%] lg:w-[90%] lg:max-w-7xl py-4">
      <MintSteps />
      <div className="mt-12 w-full h-full flex justify-center">
        {stepStatus === 'Upload' && <NFTUploader />}
        {stepStatus === 'Mint' && <MintNft />}
        {stepStatus === 'Done' && <MintDone />}
      </div>
    </div>
  );
}
