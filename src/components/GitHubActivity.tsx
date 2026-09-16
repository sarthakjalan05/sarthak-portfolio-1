import React, { useEffect, useState } from 'react';
import {
  GitCommit,
  GitPullRequest,
  GitBranch,
  Star,
  ExternalLink,
  ShieldAlert,
  RotateCw,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref_type?: string;
    ref?: string;
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    pull_request?: {
      title: string;
      html_url: string;
    };
  };
}

export const GitHubActivity: React.FC = () => {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.github.com/users/sarthakjalan05/events/public', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!res.ok) {
        throw new Error(`GitHub ledger returned status ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setEvents(data.slice(0, 6)); // Display top 6 recent maneuvers
      } else {
        setEvents([]);
      }
    } catch (err: unknown) {
      setError(
        'The Citadel ravens report the GitHub archive ledger is currently resting under public rate limits.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const getRelativeTime = (isoString: string) => {
    try {
      const past = new Date(isoString).getTime();
      const now = Date.now();
      const diffSec = Math.floor((now - past) / 1000);

      if (diffSec < 60) return 'Just now';
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHours = Math.floor(diffMin / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 30) return `${diffDays}d ago`;
      return `${Math.floor(diffDays / 30)}mo ago`;
    } catch {
      return 'Recent';
    }
  };

  const renderEventDetails = (event: GitHubEvent) => {
    const repoName = event.repo.name.replace('sarthakjalan05/', '');
    const cleanRepoUrl = `https://github.com/${event.repo.name}`;

    switch (event.type) {
      case 'PushEvent': {
        const commitCount = event.payload.commits?.length || 1;
        const firstMessage = event.payload.commits?.[0]?.message || 'Code forged and committed';
        return {
          icon: <GitCommit size={16} className="text-[#ffde7a]" />,
          title: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repoName}`,
          description: firstMessage.split('\n')[0],
          tag: 'Commit',
          url: cleanRepoUrl,
        };
      }
      case 'PullRequestEvent': {
        return {
          icon: <GitPullRequest size={16} className="text-[#99e6ff]" />,
          title: `${event.payload.action === 'opened' ? 'Opened' : 'Merged'} PR in ${repoName}`,
          description: event.payload.pull_request?.title || 'System contribution merged',
          tag: 'Pull Request',
          url: event.payload.pull_request?.html_url || cleanRepoUrl,
        };
      }
      case 'CreateEvent': {
        return {
          icon: <GitBranch size={16} className="text-[#7aff9e]" />,
          title: `Created ${event.payload.ref_type || 'repository'} in ${repoName}`,
          description: event.payload.ref ? `Branch / Tag: ${event.payload.ref}` : 'New repository initialized',
          tag: 'Created',
          url: cleanRepoUrl,
        };
      }
      case 'WatchEvent': {
        return {
          icon: <Star size={16} className="text-[var(--gold)]" />,
          title: `Starred repository ${repoName}`,
          description: 'Recognized masterwork in open source realm',
          tag: 'Starred',
          url: cleanRepoUrl,
        };
      }
      default: {
        return {
          icon: <Layers size={16} className="text-[var(--gold-dim)]" />,
          title: `Activity recorded in ${repoName}`,
          description: `Action: ${event.type.replace('Event', '')}`,
          tag: 'Action',
          url: cleanRepoUrl,
        };
      }
    }
  };

  return (
    <div className="fade-up w-full mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-cinzel text-xs tracking-[0.35em] text-[var(--gold)] uppercase font-semibold flex items-center gap-2">
            <Sparkles size={14} className="text-[var(--gold)]" />
            <span>Live Campaign Ledger · GitHub Activity</span>
          </h3>
          <p className="font-garamond text-xs text-[var(--ash)] mt-0.5">
            Synchronized directly from Sarthak&apos;s public open-source battleground.
          </p>
        </div>

        <a
          href="https://github.com/sarthakjalan05"
          target="_blank"
          rel="noopener noreferrer"
          className="font-cinzel text-[11px] uppercase tracking-wider text-[var(--gold-light)] hover:text-[var(--gold)] inline-flex items-center gap-1.5 transition-colors"
        >
          <span>@sarthakjalan05</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {loading ? (
        <div className="p-8 border border-[var(--gold-dim)]/30 bg-[#0e0a07] text-center">
          <div className="inline-block animate-spin text-[var(--gold)] mb-3">
            <RotateCw size={22} />
          </div>
          <p className="font-cinzel text-xs uppercase tracking-widest text-[var(--parchment)]">
            Dispatching Ravens to GitHub Ledger...
          </p>
        </div>
      ) : error || events.length === 0 ? (
        <div className="realm-card relative p-6 sm:p-8 border border-[rgba(201,168,76,0.35)] bg-[#120d09]/90 text-center">
          <span className="corner corner-tl" />
          <span className="corner corner-br" />
          <div className="w-12 h-12 rounded-full mx-auto border border-[var(--gold-dim)] flex items-center justify-center bg-[#1a130c] text-[var(--gold)] mb-3">
            <ShieldAlert size={22} />
          </div>
          <h4 className="font-cinzel-dec text-base font-bold text-[var(--parchment)] mb-2">
            Public Raven Quota Resting
          </h4>
          <p className="font-garamond text-sm text-[var(--ash)] max-w-md mx-auto mb-5 leading-relaxed">
            {error ||
              'Public activity records are momentarily guarded by API limits. All maneuvers are live and inspectable on GitHub.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={fetchActivity}
              className="got-cta-ghost text-xs py-2 px-4 inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCw size={12} />
              <span>Retry Raven</span>
            </button>
            <a
              href="https://github.com/sarthakjalan05"
              target="_blank"
              rel="noopener noreferrer"
              className="got-cta-btn text-xs py-2 px-5 inline-flex items-center gap-2"
            >
              <span>Inspect Battlefield</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => {
            const details = renderEventDetails(ev);
            return (
              <a
                key={ev.id}
                href={details.url}
                target="_blank"
                rel="noopener noreferrer"
                className="realm-card relative p-4 sm:p-5 border border-[rgba(201,168,76,0.25)] bg-[#120d09]/90 hover:border-[var(--gold)] flex flex-col justify-between group transition-all"
              >
                <span className="corner corner-tl" />
                <span className="corner corner-br" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-[#1a140d] border border-[var(--gold-dim)]/40">
                        {details.icon}
                      </div>
                      <span className="font-cinzel text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[var(--gold)]/10 text-[var(--gold-light)] border border-[var(--gold-dim)]/30">
                        {details.tag}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 font-cinzel text-[10px] text-[var(--ash)]">
                      <Clock size={11} />
                      {getRelativeTime(ev.created_at)}
                    </span>
                  </div>

                  <h5 className="font-cinzel text-xs font-semibold text-[var(--parchment)] group-hover:text-[var(--gold-light)] transition-colors mb-1 line-clamp-1">
                    {details.title}
                  </h5>

                  <p className="font-garamond text-xs text-[var(--ash)] line-clamp-2 leading-relaxed">
                    {details.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[rgba(201,168,76,0.15)] flex items-center justify-between text-[10px] font-cinzel text-[var(--gold-dim)] group-hover:text-[var(--gold)]">
                  <span>Inspect Commit / PR</span>
                  <ExternalLink size={11} />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};
