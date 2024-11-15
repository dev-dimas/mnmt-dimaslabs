export default function usePreviousFileURI() {
  const getPreviousFileURI = (): string | null => {
    if (typeof window === 'undefined') return null;

    const isPreviousFileURIExist = localStorage.getItem('unfinished_ipfs_url');

    if (!isPreviousFileURIExist) return null;

    const isPreviousFileURIValid = isPreviousFileURIExist.startsWith('ipfs://');

    if (!isPreviousFileURIValid) {
      localStorage.removeItem('unfinished_ipfs_url');
      return null;
    }

    return isPreviousFileURIExist;
  };

  return { getPreviousFileURI };
}
