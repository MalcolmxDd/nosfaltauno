import { MOCK_MATCHES } from '@/data/mocks';
import MatchDetailsClient from '@/components/MatchDetailsClient';

export function generateStaticParams() {
    return MOCK_MATCHES.map((match) => ({
        id: match.id.toString(),
    }));
}

export default async function MatchDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <MatchDetailsClient matchId={id} />;
}
