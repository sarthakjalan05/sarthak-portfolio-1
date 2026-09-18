import React from 'react';
import { EmptyState } from '../components/EmptyState';
import { Terminal } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="realm-page flex items-center justify-center min-h-[75vh]">
      <EmptyState
        icon={<Terminal size={36} />}
        heading="SYS://404 · Node Unreachable"
        body="You have navigated to an unmapped subnet address in the network grid. No system service, matrix record, or telemetry log resides at this endpoint."
        ctaText="Return to System Root"
        ctaLink="/"
        accentColor="var(--cyan)"
      />
    </div>
  );
};
