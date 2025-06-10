import DelayedLoader from '@/components/ui/delayed-loader';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
      <DelayedLoader 
        variant="spinner"
        size="lg"
        minDelay={2000}
        message="Loading your Cloud Wardrobe..."
        className="text-center"
      />
    </div>
  );
}
