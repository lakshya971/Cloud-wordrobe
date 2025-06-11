import DelayedLoader from '@/components/ui/delayed-loader';

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <DelayedLoader 
          variant="spinner"
          size="md"
          minDelay={1800}
          message="Authenticating..."
          className="text-center"
        />
        <p className="mt-2 text-gray-600">Please wait while we verify your credentials</p>
      </div>
    </div>
  );
}
