'use client';

import { useState } from 'react';
import MintSteps from './mint-step';
import { useActiveWallet, useAutoConnect } from 'thirdweb/react';
import ConnectWalletButton from '@/components/navbar/connect-wallet-button';
import NFTUploader from './nft-uploader';
import { client } from '@/app/client';
import { LoaderCircle } from 'lucide-react';
import MintNft from './mint-nft';
import MintDone from './mint-done';

type StepStatus = 'Upload' | 'Mint' | 'Done';

export default function Page() {
  const { isLoading } = useAutoConnect({ client });
  const wallet = useActiveWallet();
  const [stepStatus, setStepStatus] = useState<StepStatus>('Upload');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-full">
        <LoaderCircle className="animate-spin -mt-[20%]" size={28} />;
      </div>
    );
  }

  if (!wallet)
    return <ConnectWalletButton title="Connect wallet first!" hideClose hideTriggerButton />;

  return (
    <div className="flex flex-col items-center mx-auto min-h-full mt-10 w-full max-w-[90%] lg:w-[90%] lg:max-w-7xl py-4">
      <MintSteps {...{ stepStatus }} />
      <div className="mt-12 w-full h-full flex justify-center">
        {stepStatus === 'Upload' && <NFTUploader {...{ setStepStatus }} />}
        {stepStatus === 'Mint' && <MintNft {...{ setStepStatus }} />}
        {stepStatus === 'Done' && <MintDone {...{ setStepStatus }} />}
      </div>
    </div>
  );
}
