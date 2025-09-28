import LoadingSpinner from '../LoadingSpinner';

export default function LoadingSpinnerExample() {
  return (
    <div className="flex gap-8 items-center p-6">
      <div className="text-center">
        <LoadingSpinner size="sm" />
        <p className="text-sm text-muted-foreground mt-2">Small</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="md" />
        <p className="text-sm text-muted-foreground mt-2">Medium</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground mt-2">Large</p>
      </div>
    </div>
  );
}