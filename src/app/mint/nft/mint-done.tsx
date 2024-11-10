'use client';

import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setStepStatus: Dispatch<SetStateAction<'Upload' | 'Mint' | 'Done'>>;
};
export default function MintDone({ setStepStatus }: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-1">
      <h1 className="text-xl font-extrabold">Congratulation!</h1>
      <p className="text-sm text-zinc-400 font-semibold">
        You&apos;ve crystalized your art, it will be marked for so long time.
      </p>

      <div className="bg-zinc-200 shadow-xl rounded-xl w-full max-w-sm aspect-square overflow-hidden flex items-center justify-center mt-10">
        <p className="font-semibold text-sm">Here the minted NFT</p>
      </div>

      <Button className="rounded-full mt-10" onClick={() => setStepStatus('Upload')}>
        <RotateCw />
        <span>Mint Again</span>
      </Button>
    </div>
  );
}
