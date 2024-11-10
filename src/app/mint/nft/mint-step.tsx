import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  stepStatus: 'Upload' | 'Mint' | 'Done';
};
export default function MintSteps({ stepStatus }: Props) {
  const isMintStepActive: boolean = stepStatus === 'Mint' || stepStatus === 'Done';
  const isDoneStepActive: boolean = stepStatus === 'Done';

  return (
    <div className="flex justify-center items-center w-full max-w-[50%] lg:w-[60%] lg:max-w-4xl">
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
        'rounded-full disabled:opacity-100 font-semibold shadow-none',
        isStepActive
          ? 'bg-gradient-to-b from-fuchsia-600 to-rose-400'
          : 'text-zinc-400 hover:bg-zinc-200 bg-zinc-200',
      )}
      disabled
    >
      {children}
    </Button>
  );
}
