import { create } from 'zustand';

type StepStatus = 'Upload' | 'Mint' | 'Done';
interface MintStepStatusStore {
  stepStatus: StepStatus | null;
  setStepStatus: (status: StepStatus) => void;
}

export const useMintStepStatus = create<MintStepStatusStore>((set) => ({
  stepStatus: null,
  setStepStatus: (status) => set({ stepStatus: status }),
}));
