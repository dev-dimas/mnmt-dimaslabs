'use client';

import { prepareMintNFT } from '@/actions/mint-actions';
import { contract } from '@/app/contract';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import usePreviousFileURI from '@/hooks/usePreviousFileURI';
import { cn } from '@/lib/utils';
import { useMintedImageURL } from '@/store/useMintedImageURL';
import { useMintStepStatus } from '@/store/useMintStepStatus';
import { Info, LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import { prepareContractCall } from 'thirdweb';
import { useSendTransaction } from 'thirdweb/react';
import { MintFormSchema } from './form-schema';

type Props = {
  form: UseFormReturn<{
    name: string;
    description: string;
    externalUrl?: string | undefined;
  }>;
};

export default function FormMintNFT({ form }: Props) {
  const { setStepStatus } = useMintStepStatus();
  const { getPreviousFileURI } = usePreviousFileURI();
  const { mutateAsync: sendTx } = useSendTransaction();
  const { setMintedImageURL } = useMintedImageURL();

  async function onSubmit(values: MintFormSchema) {
    try {
      const fileURI = getPreviousFileURI();
      if (!fileURI) {
        toast.error('You need to upload valid image before minting!');
        setStepStatus('Upload');
        return;
      }

      const tokenURI = await prepareMintNFT({
        ...values,
        image: fileURI,
      });

      const transaction = prepareContractCall({
        contract,
        method: 'function mintNFT(address recipient, string tokenURI)',
        params: [process.env.NEXT_PUBLIC_MY_WALLET_ADDRESS!, tokenURI],
      });
      const transactionResult = await sendTx(transaction);
      const transactionHash = transactionResult.transactionHash;

      if (transactionHash) {
        setMintedImageURL(fileURI);
        localStorage.removeItem('unfinished_ipfs_url');
        setStepStatus('Done');
      }
    } catch (error) {
      if (typeof error === 'string') {
        toast.error(error);
        return;
      }
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  useEffect(() => {
    const fileURI = getPreviousFileURI();
    if (!fileURI) setStepStatus('Upload');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-3xl mx-auto">
        <FormField
          control={form.control}
          name="name"
          disabled={form.formState.isSubmitting}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g. Epic Ninja Fox" type="text" error={error} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          disabled={form.formState.isSubmitting}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel className="font-bold">
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your artwork"
                  className="resize-none"
                  rows={10}
                  error={error}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="externalUrl"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">External URL</FormLabel>
              <FormControl>
                <Input placeholder="e.g. https://external-url.com" type="url" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className={cn(
            'w-full flex gap-1 items-center text-blue-400',
            form.formState.isSubmitting && 'text-blue-200',
          )}
        >
          <Info size={15} />
          <span className="text-xs font-bold text-wrap">
            Tip: Hover over the image and click it to return to the Upload step.
          </span>
        </div>
        <Button
          type="submit"
          className="w-full rounded-full flex items-center gap-3"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle size={20} className="animate-spin" />
              <span>Minting. . .</span>
            </>
          ) : (
            'Mint NFT'
          )}
        </Button>
      </form>
    </Form>
  );
}