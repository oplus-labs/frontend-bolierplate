import Skeleton from '../Skeleton';

export default function Fallback() {
  return (
    <div className=" relative h-full w-full text-center ">
      <Skeleton className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 !rounded-3xl bg-gray-100" />
    </div>
  );
}
