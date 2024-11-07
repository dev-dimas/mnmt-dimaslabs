import { createThirdwebClient } from 'thirdweb';

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error('Missing thirdweb client ID');
}

export const client = createThirdwebClient({
  clientId: clientId,
});
