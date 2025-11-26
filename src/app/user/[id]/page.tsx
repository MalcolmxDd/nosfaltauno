import { MOCK_USERS } from '@/data/mocks';
import UserProfileClient from '@/components/UserProfileClient';

export function generateStaticParams() {
    return MOCK_USERS.map((user) => ({
        id: user.id,
    }));
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
    return <UserProfileClient userId={params.id} />;
}
