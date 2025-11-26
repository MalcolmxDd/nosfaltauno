import { MOCK_MATCHES } from '@/data/mocks';
import MatchDetailsClient from '@/components/MatchDetailsClient';

export function generateStaticParams() {
    return MOCK_MATCHES.map((match) => ({
        id: match.id.toString(),
    }));
}

export default function MatchDetailsPage({ params }: { params: { id: string } }) {
    return <MatchDetailsClient matchId={params.id} />;
}
