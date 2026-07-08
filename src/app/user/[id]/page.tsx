import { MOCK_USERS } from '@/data/mocks';
import UserProfileClient from '@/components/UserProfileClient';

export function generateStaticParams() {
    return MOCK_USERS.map((user) => ({
        id: user.id,
    }));
}

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <UserProfileClient userId={id} />;
}
