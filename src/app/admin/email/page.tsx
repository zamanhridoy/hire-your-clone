"use client";

import EmailInbox from "@/components/EmailInbox";

export default function EmailPage() {
  return (
    <div className="space-y-8 pb-4">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Inbox</h1>
        <p className="text-slate-500 font-medium tracking-tight">
          Send and receive emails directly from your connected account.
        </p>
      </div>
      <EmailInbox />
    </div>
  );
}
