import { MOCK_TEAMS } from '@/data/mocks';
import TeamDetailsClient from '@/components/TeamDetailsClient';

export function generateStaticParams() {
    return MOCK_TEAMS.map((team) => ({
        id: team.id,
    }));
}

export default function TeamDetailsPage({ params }: { params: { id: string } }) {
    return <TeamDetailsClient teamId={params.id} />;
}

