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

        {/* Subject Filter Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-[300px]" />
        </div>

        {/* Tabs Skeleton */}
        <Skeleton className="h-10 w-full mb-8" />

        {/* Course Notes Skeleton */}
        <div className="space-y-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <GlassmorphismCard key={i}>
                <Skeleton className="h-7 w-3/4 mb-4" />
                <Skeleton className="h-5 w-24 mb-4" />

                <div className="space-y-3 mt-4">
                  {Array(2)
                    .fill(0)
                    .map((_, j) => (
                      <div key={j} className="border border-white/10 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Skeleton className="h-5 w-5 mr-3" />
                            <Skeleton className="h-5 w-40" />
                          </div>
                          <Skeleton className="h-4 w-4" />
                        </div>
                      </div>
                    ))}
                </div>
              </GlassmorphismCard>
            ))}
        </div>
      </div>
    </div>
  )
}
