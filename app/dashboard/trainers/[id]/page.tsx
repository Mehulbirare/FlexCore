import { MOCK_TRAINERS } from "@/lib/mock-data"
import TrainerProfilePage from "./trainer-profile"

// Static export needs the full list of dynamic routes up front. Generate one
// page per known trainer id; the client component reads the id via useParams.
export function generateStaticParams() {
    return MOCK_TRAINERS.map((trainer) => ({ id: trainer.id }))
}

export default function Page() {
    return <TrainerProfilePage />
}
