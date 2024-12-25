import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  skeletonCount?: number;
  skeletonClasses?: string;
  isEmpty: boolean;
  emptyMessage?: string;
} & ComponentPropsWithoutRef<'div'>;

export default function Container({
  isLoading,
  isError,
  errorMessage = 'Desila se neka greška',
  skeletonCount = 3,
  skeletonClasses,
  isEmpty,
  emptyMessage = 'Nema podataka',
  ...props
}: Props) {
  if (isLoading) {
    return Array.from({ length: skeletonCount }).map((_, i) => (
      <Skeleton key={i} className={cn('h-[33rem] w-full', skeletonClasses)} />
    ));
  }

  if (isError) {
    return (
      <div className="text-center mx-auto">
        <p className="text-lg font-bold text-red-400">{errorMessage}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center mx-auto">
        <p className="text-lg font-bold">{emptyMessage}</p>
      </div>
    );
  }

  return <div {...props} />;
}
