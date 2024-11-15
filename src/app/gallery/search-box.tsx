'use client';

import { Input } from '@/components/ui/input';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

export default function SearchBox() {
  const [search, setSearch] = useQueryState('search', { clearOnDefault: true });

  return (
    <Input
      placeholder="Search NFT..."
      type="text"
      className="sm:max-w-sm max-sm:mt-3 rounded-full border-2"
      value={search || ''}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export function SearchNotFound() {
  const [search] = useQueryState('search', { clearOnDefault: true });
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!search) {
      setIsNotFound(false);
      return;
    }

    const children = document.querySelectorAll('#nft-list .hidden');
    const nftList = document.getElementById('nft-list');
    setIsNotFound(children.length === nftList?.children.length);
  }, [search]);

  if (!search) return <></>;

  if (search) {
    if (!isNotFound) return <></>;

    return (
      <p className="font-semibold text-zinc-400">
        Sorry, we couldn&apos;t find any NFT named &quot;{search}&quot;.
      </p>
    );
  }
}
