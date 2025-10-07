import { Skeleton } from "@/components/ui/skeleton"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"

export default function Loading() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container px-4 py-10 md:py-16">
        <div className="mb-10">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>

        <div className="grid gap-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <GlassmorphismCard key={i}>
                <div className="flex justify-between items-start">
                  <div className="w-3/4">
                    <Skeleton className="h-6 w-full mb-3" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="mt-4 flex justify-end">
                  <Skeleton className="h-9 w-28" />
                </div>
              </GlassmorphismCard>
            ))}
        </div>
      </div>
    </div>
  )
}
