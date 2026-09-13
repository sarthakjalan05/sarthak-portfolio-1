import React from 'react';
import { EmptyState } from '../components/EmptyState';
import { Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="realm-page flex items-center justify-center min-h-[75vh]">
      <EmptyState
        icon={<Compass size={36} />}
        heading="Beyond the Wall"
        body="You have wandered past the frozen boundaries of the Seven Kingdoms into the icy wastes of the Land of Always Winter. No scrolls, castles, or code reside here — only cold winds and shadows."
        ctaText="Journey Back to the Realm"
        ctaLink="/"
        accentColor="#5ca0d3"
      />
    </div>
  );
};
