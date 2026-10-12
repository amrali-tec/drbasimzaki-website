import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'منطقة معزولة ومحمية - لوحة تحكم د. باسم زكي',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-tajawal antialiased selection:bg-brand-500 selection:text-slate-950">
      {children}
    </div>
  );
}
