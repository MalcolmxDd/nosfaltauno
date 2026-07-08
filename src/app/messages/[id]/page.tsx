import { MOCK_USERS } from '@/data/mocks';
import ChatClient from '@/components/ChatClient';

export function generateStaticParams() {
    return MOCK_USERS.map((user) => ({
        id: user.id,
    }));
}

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ChatClient userId={id} />;
}
