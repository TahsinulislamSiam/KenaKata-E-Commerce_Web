import EmptyState from '@/components/common/EmptyState';
import SectionHeader from '@/components/common/SectionHeader';

/**
 * Temporary stand-in so the router works while later delivery steps land.
 * Replaced by the real page in Step 3.
 */
export default function Stub({ title, step }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionHeader title={title} />
      <EmptyState
        title={`Coming in ${step}`}
        description="This route is wired up and will be filled in during the next delivery step."
        className="mt-6"
      />
    </div>
  );
}
