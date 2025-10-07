import { Skeleton } from "@/components/ui/skeleton"
import { GlassmorphismCard } from "@/components/ui/glassmorphism-card"

export default function Loading() {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container px-4 py-10 md:py-16">
        <div className="mb-10">
          <Skeleton className="h-10 w-64 mb-4 bg-card/50" />
          <Skeleton className="h-5 w-full max-w-2xl bg-card/30" />
        </div>

        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-40 bg-card/50" />
          <Skeleton className="h-5 w-32 bg-card/30" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <GlassmorphismCard key={i} className="border border-border/10 p-6">
                <div className="flex justify-between mb-2">
                  <Skeleton className="h-5 w-24 bg-card/50" />
                  <Skeleton className="h-5 w-20 bg-card/50" />
                </div>
                <Skeleton className="h-6 w-3/4 my-3 bg-card/50" />
                <div className="flex gap-4 mb-3">
                  <Skeleton className="h-4 w-24 bg-card/30" />
                  <Skeleton className="h-4 w-24 bg-card/30" />
                </div>
                <Skeleton className="h-4 w-full mb-2 bg-card/30" />
                <Skeleton className="h-4 w-full mb-2 bg-card/30" />
                <Skeleton className="h-4 w-full mb-4 bg-card/30" />
                <div className="flex justify-end">
                  <Skeleton className="h-4 w-20 bg-card/30" />
                </div>
              </GlassmorphismCard>
            ))}
        </div>
      </div>
    </div>
  )
}
