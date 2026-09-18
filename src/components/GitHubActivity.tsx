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
  Terminal,
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
        throw new Error(`GitHub API returned status ${res.status}`);
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setEvents(data.slice(0, 6));
      } else {
        setEvents([]);
      }
    } catch {
      setError(
        'GitHub telemetry stream reached unauthenticated rate limits. View repositories directly on GitHub.'
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
        const firstMessage = event.payload.commits?.[0]?.message || 'Code pushed to repository';
        return {
          icon: <GitCommit size={15} className="text-[var(--cyan)]" />,
          title: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repoName}`,
          description: firstMessage.split('\n')[0],
          tag: 'Commit',
          url: cleanRepoUrl,
        };
      }
      case 'PullRequestEvent': {
        return {
          icon: <GitPullRequest size={15} className="text-[var(--magenta)]" />,
          title: `${event.payload.action === 'opened' ? 'Opened' : 'Merged'} PR in ${repoName}`,
          description: event.payload.pull_request?.title || 'Pull request update',
          tag: 'Pull Request',
          url: event.payload.pull_request?.html_url || cleanRepoUrl,
        };
      }
      case 'CreateEvent': {
        return {
          icon: <GitBranch size={15} className="text-[#00ff88]" />,
          title: `Created ${event.payload.ref_type || 'ref'} in ${repoName}`,
          description: event.payload.ref ? `Branch / Tag: ${event.payload.ref}` : 'Initialized repository',
          tag: 'Created',
          url: cleanRepoUrl,
        };
      }
      case 'WatchEvent': {
        return {
          icon: <Star size={15} className="text-[var(--amber)]" />,
          title: `Starred repository ${repoName}`,
          description: 'Starred open-source project',
          tag: 'Starred',
          url: cleanRepoUrl,
        };
      }
      default: {
        return {
          icon: <Layers size={15} className="text-[var(--cyan-dim)]" />,
          title: `Activity in ${repoName}`,
          description: `Action: ${event.type.replace('Event', '')}`,
          tag: 'Activity',
          url: cleanRepoUrl,
        };
      }
    }
  };

  return (
    <div className="fade-up w-full mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-chakra text-xs tracking-[0.3em] text-[var(--cyan)] uppercase font-semibold flex items-center gap-2">
            <Terminal size={14} className="text-[var(--cyan)]" />
            <span>SYS://GITHUB.ACTIVITY_STREAM</span>
          </h3>
          <p className="font-space text-xs text-[var(--text-muted)] mt-0.5">
            Real-time public events polled from Sarthak&apos;s open-source GitHub account.
          </p>
        </div>

        <a
          href="https://github.com/sarthakjalan05"
          target="_blank"
          rel="noopener noreferrer"
          className="font-chakra text-xs uppercase tracking-wider text-[var(--cyan)] hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <span>@sarthakjalan05</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {loading ? (
        <div className="p-8 border border-[rgba(0,240,255,0.2)] bg-[#0d1017] text-center rounded">
          <div className="inline-block animate-spin text-[var(--cyan)] mb-3">
            <RotateCw size={22} />
          </div>
          <p className="font-chakra text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Polling GitHub Telemetry Feed...
          </p>
        </div>
      ) : error || events.length === 0 ? (
        <div className="realm-card relative p-6 sm:p-8 border border-[rgba(0,240,255,0.25)] bg-[#0d1017]/90 text-center rounded">
          <span className="corner corner-tl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
          <span className="corner corner-br" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
          <div className="w-12 h-12 rounded mx-auto border border-[var(--cyan-dim)] flex items-center justify-center bg-[#07080c] text-[var(--cyan)] mb-3">
            <ShieldAlert size={22} />
          </div>
          <h4 className="font-orbitron text-sm sm:text-base font-bold text-[var(--text)] mb-2">
            GitHub Telemetry Standby
          </h4>
          <p className="font-space text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto mb-5 leading-relaxed">
            {error || 'Telemetry events currently resting. All repositories and commit histories are public on GitHub.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={fetchActivity}
              className="cyber-ghost text-xs py-2 px-4 inline-flex items-center gap-2 cursor-pointer rounded"
              style={{ borderColor: 'rgba(0, 240, 255, 0.4)', color: 'var(--text)' }}
            >
              <RotateCw size={12} />
              <span>Retry Query</span>
            </button>
            <a
              href="https://github.com/sarthakjalan05"
              target="_blank"
              rel="noopener noreferrer"
              className="got-cta-btn text-xs py-2 px-5 inline-flex items-center gap-2 rounded"
              style={{ background: 'var(--cyan)', color: '#07080c' }}
            >
              <span>Launch GitHub Profile</span>
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
                className="realm-card relative p-4 sm:p-5 border border-[rgba(0,240,255,0.2)] bg-[#0d1017]/95 hover:border-[var(--cyan)] flex flex-col justify-between group transition-all rounded"
              >
                <span className="corner corner-tl" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />
                <span className="corner corner-br" style={{ '--accent': 'var(--cyan)' } as React.CSSProperties} />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-[#07080c] border border-[rgba(0,240,255,0.25)]">
                        {details.icon}
                      </div>
                      <span className="font-chakra text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#07080c] text-[var(--cyan)] border border-[rgba(0,240,255,0.25)] rounded">
                        {details.tag}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 font-space text-[10px] text-[var(--text-muted)]">
                      <Clock size={11} />
                      {getRelativeTime(ev.created_at)}
                    </span>
                  </div>

                  <h5 className="font-orbitron text-xs font-semibold text-[var(--text)] group-hover:text-[var(--cyan)] transition-colors mb-1 line-clamp-1">
                    {details.title}
                  </h5>

                  <p className="font-space text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {details.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[rgba(0,240,255,0.12)] flex items-center justify-between text-[10px] font-chakra text-[var(--cyan)] group-hover:text-white">
                  <span>View on GitHub</span>
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
