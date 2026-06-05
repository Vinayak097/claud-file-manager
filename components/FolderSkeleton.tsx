import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'

const FolderSkeleton = () => {
  return (
    <Card className="bg-zinc-900 border-white/10 border-0 border-solid p-4 gap-0">
      <CardContent className="flex p-0 items-center gap-3">
        <Skeleton className="size-10 rounded-lg" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}

export default FolderSkeleton
