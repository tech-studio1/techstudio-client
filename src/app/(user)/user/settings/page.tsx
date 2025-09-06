import { PageContainer } from '@/components/layouts/page-container';
import { PageHeader } from '@/components/layouts/page-header';
import { DeleteAccountCard } from '@/components/settings/delete-account-card';
import { UserDetailsForm } from '@/components/settings/edit-others';

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Account Settings"
        description="Manage your account preferences and settings"
      />
      <UserDetailsForm />
      <DeleteAccountCard />
    </PageContainer>
  );
}
