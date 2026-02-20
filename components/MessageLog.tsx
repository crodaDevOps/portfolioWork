import React from 'react';
import { Mail, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

const MESSAGES = [
  {
    id: 1,
    from: 'System',
    subject: 'Environment Initialized',
    date: '10:00 AM',
    body: 'Render core successfully mounted. WebGL context active. Physics engine standby.',
    status: 'success'
  },
  {
    id: 2,
    from: 'Recruiter_AI',
    subject: 'New Opportunity Match',
    date: '10:42 AM',
    body: 'Algorithm identified 98% match for Senior Frontend Architect role at stealth startup.',
    status: 'info'
  },
  {
    id: 3,
    from: 'GitHub_Bot',
    subject: 'PR Merged: Nebula Stream',
    date: '11:15 AM',
    body: 'Pull request #402 "Optimize fragment shaders" merged into main by alex_dev.',
    status: 'success'
  },
  {
    id: 4,
    from: 'Security_Daemon',
    subject: 'Dependency Audit',
    date: '12:30 PM',
    body: 'Weekly scan complete. 0 high severity vulnerabilities found in production build.',
    status: 'warning'
  },
  {
    id: 5,
    from: 'Client_Vogel',
    subject: 'Re: Design System V2',
    date: '02:15 PM',
    body: 'The new token structure is exactly what we needed. Documentation looks pristine.',
    status: 'info'
  },
  {
    id: 6,
    from: 'Vercel',
    subject: 'Deployment Status',
    date: '03:45 PM',
    body: 'Project "Void Runner" deployed successfully to production. Build time: 42s.',
    status: 'success'
  },
  {
    id: 7,
    from: 'System',
    subject: 'Memory Warning',
    date: '04:20 PM',
    body: 'Heap usage spike detected in background worker. Garbage collection triggered.',
    status: 'warning'
  },
  {
    id: 8,
    from: 'Newsletter',
    subject: 'React 19 Alpha',
    date: '05:00 PM',
    body: 'Breaking changes analysis: The compiler is now automatic. Memoization is dead.',
    status: 'info'
  }
];

export const MessageLog: React.FC = () => {
  return (
    <div className="h-full bg-background/90 backdrop-blur-md border border-white/10 flex flex-col overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
        <span className="text-xs font-mono uppercase tracking-widest text-textMuted">Incoming Stream</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>

      {/* Infinite Scroll List */}
      <div className="flex-1 overflow-y-auto p-0 scrollbar-hide">
        {MESSAGES.map((msg, idx) => (
          <div 
            key={msg.id} 
            className="group p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-accent font-mono">{msg.from}</span>
              <span className="text-[10px] text-zinc-600 font-mono">{msg.date}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              {msg.status === 'success' && <CheckCircle2 className="w-3 h-3 text-green-500" />}
              {msg.status === 'warning' && <ShieldAlert className="w-3 h-3 text-yellow-500" />}
              {msg.status === 'info' && <Mail className="w-3 h-3 text-blue-500" />}
              <h4 className="text-sm text-textMain font-medium truncate">{msg.subject}</h4>
            </div>
            <p className="text-xs text-textMuted leading-relaxed line-clamp-2 group-hover:text-zinc-400 transition-colors">
              {msg.body}
            </p>
          </div>
        ))}
        {/* Repeat messages to simulate infinite length for demo */}
        {MESSAGES.map((msg, idx) => (
          <div 
            key={`${msg.id}-duplicate`} 
            className="group p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-accent font-mono">{msg.from}</span>
              <span className="text-[10px] text-zinc-600 font-mono">{msg.date}</span>
            </div>
            <div className="mb-2 flex items-center gap-2">
              {msg.status === 'success' && <CheckCircle2 className="w-3 h-3 text-green-500" />}
              {msg.status === 'warning' && <ShieldAlert className="w-3 h-3 text-yellow-500" />}
              {msg.status === 'info' && <Mail className="w-3 h-3 text-blue-500" />}
              <h4 className="text-sm text-textMain font-medium truncate">{msg.subject}</h4>
            </div>
            <p className="text-xs text-textMuted leading-relaxed line-clamp-2 group-hover:text-zinc-400 transition-colors">
              {msg.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
