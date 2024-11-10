'use client';

import { Button } from '@/components/ui/button';
import { FileInput, FileUploader, FileUploaderContent } from '@/components/ui/file-upload';
import useUrlFilePreview from '@/hooks/useUrlFilePreview';
import { CloudUpload, FolderOpen } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  setStepStatus: Dispatch<SetStateAction<'Upload' | 'Mint' | 'Done'>>;
};
export default function NFTUploader({ setStepStatus }: Props) {
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    accept: {
      'image/svg+xml': ['.svg'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/gif': ['.gif'],
      'video/mp4': ['.mp4'],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 20,
    multiple: false,
  };

  return (
    <>
      <FileUploader
        reSelect
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={dropZoneConfig}
        className="relative rounded-lg p-2 w-full max-w-md h-full"
      >
        <FileInput className="outline-dashed outline-2 outline-zinc-500 aspect-square max-w-md flex justify-center items-center rounded-b-none">
          <div className="flex items-center justify-center flex-col w-full h-full">
            {files?.length ? <PreviewFile file={files[0]} /> : <UploadInstructions />}
          </div>
        </FileInput>
        <FileUploaderContent></FileUploaderContent>
        <Button
          className="w-[calc(100%+3.5px)] -mx-[1.5px] rounded-t-none rounded-b-lg h-16 font-semibold bg-zinc-950 disabled:bg-zinc-600 "
          disabled={!files}
          onClick={() => {
            setStepStatus('Mint');
          }}
        >
          Upload
        </Button>
      </FileUploader>
    </>
  );
}

function UploadInstructions() {
  return (
    <>
      <CloudUpload strokeWidth={2} size={32} className="text-gray-500 dark:text-gray-400" />
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, GIF or MP4</p>
    </>
  );
}

function PreviewFile({ file }: { file: File }) {
  const { previewUrl, isImage, isVideo } = useUrlFilePreview(file);

  if (!file || !previewUrl) return <></>;

  return (
    <div className="w-full h-full relative group flex justify-center items-center">
      <button className="flex flex-col justify-center items-center bg-black/60 absolute w-full h-full opacity-0 group-hover:opacity-100">
        <FolderOpen color="white" size={40} strokeWidth={2} />
        <p className="text-white font-semibold">Choose another file</p>
      </button>

      {isImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full max-w-lg h-auto aspect-square object-contain"
        />
      )}
      {isVideo && <video src={previewUrl} autoPlay />}
    </div>
  );
}
