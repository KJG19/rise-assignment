import { Program } from "@/types/program";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProgramPage({ params }: PageProps) {
  const { id } = await params;

  const response = await fetch(
    `https://672d2f78fd8979715641a684.mockapi.io/information/${id}`
  );

  const program: Program = await response.json();
  const spotsLeft = program.capacity - program.registered;

  return (
    <div>
      <h1>{program.name}</h1>
      <p>{program.description}</p>
      <ul>
        <li>
          {program.startDate} - {program.endDate}
        </li>
        <li>{program.coach}</li>
        <li>{program.visibility}</li>
        <li>
          {program.registered}/{program.capacity} ({spotsLeft})
        </li>
      </ul>

      <div>
        <ul>
          {program.session?.map((session, index) => (
            <li key={index}>
              {session.date} @ {session.time}
            </li>
          )) ?? <li>No sessions found</li>}
        </ul>
      </div>
    </div>
  );
}
