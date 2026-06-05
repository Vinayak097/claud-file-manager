import { Skeleton } from './ui/skeleton'

const FileSkeleton = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-6 py-4 items-center gap-4 ">
      <div className="flex items-center gap-3">
        <Skeleton className="size-9 rounded-lg" />
        <Skeleton className="h-4 w-36 rounded" />
      </div>
      <Skeleton className="h-4 w-16 rounded" />
      <Skeleton className="h-4 w-12 rounded" />
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="size-8 rounded-md" />
    </div>
  )
}

export default FileSkeleton
