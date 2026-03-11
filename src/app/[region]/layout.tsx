import { notFound } from 'next/navigation';
import { VALID_REGIONS } from '@/lib/region';
import { Region } from '@/types/product';

export default function RegionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { region: string };
}) {
  if (!VALID_REGIONS.includes(params.region as Region)) {
    notFound();
  }

  return <>{children}</>;
}
