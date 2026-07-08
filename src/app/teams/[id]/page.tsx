import { MOCK_TEAMS } from '@/data/mocks';
import TeamDetailsClient from '@/components/TeamDetailsClient';

export function generateStaticParams() {
    return MOCK_TEAMS.map((team) => ({
        id: team.id,
    }));
}

export default async function TeamDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <TeamDetailsClient teamId={id} />;
}

