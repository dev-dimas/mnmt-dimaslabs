import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useMintStepStatus } from '@/store/useMintStepStatus';
import { ReactNode } from 'react';

export default function MintSteps() {
  const { stepStatus } = useMintStepStatus();

  const isMintStepActive: boolean = stepStatus === 'Mint' || stepStatus === 'Done';
  const isDoneStepActive: boolean = stepStatus === 'Done';

  return (
    <div className="flex justify-center items-center w-full max-w-[90%] sm:max-w-xl">
      <Step key="Upload" isStepActive>
        Upload
      </Step>

      <Separator className={cn('flex-1', isMintStepActive && 'bg-zinc-400')} />
      <Step key="Mint" isStepActive={isMintStepActive}>
        Mint
      </Step>

      <Separator className={cn('flex-1', isDoneStepActive && 'bg-zinc-400')} />
      <Step key="Done" isStepActive={isDoneStepActive}>
        Done
      </Step>
    </div>
  );
}

type StepProps = {
  isStepActive?: boolean;
  children: ReactNode;
};
function Step({ isStepActive = false, children }: StepProps) {
  return (
    <Button
      className={cn(
        'rounded-full disabled:opacity-100 font-semibold shadow-none text-zinc-400 hover:bg-zinc-200 bg-zinc-200 transition-none',
        isStepActive && 'bg-gradient-to-b from-fuchsia-600 to-rose-400 text-white',
      )}
      variant="ghost"
      disabled
    >
      {children}
    </Button>
  );
}
