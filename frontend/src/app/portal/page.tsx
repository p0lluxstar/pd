'use client';

import { useRouter } from 'next/navigation'; // Это важно!
import { useEffect } from 'react';

// редирект на /portal/shops

export default function PortalPage(): null {
  const router = useRouter();

  useEffect(() => {
    router.push('/portal/shops');
  }, [router]);

  return null;
}
