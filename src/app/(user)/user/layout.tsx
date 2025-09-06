import ProfileSidebar from '@/components/profile-sidebar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <ProfileSidebar />
      {/* Main Content */}
      <main className="flex-1">
        <div className="my-10 py-6 xl:my-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 xl:ml-32">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
