/* eslint-disable react/jsx-props-no-spreading */
import { HTMLAttributes } from 'react';
import { cn } from '@/utils';

export default function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-gray-300 ', className)} {...props} />;
}
