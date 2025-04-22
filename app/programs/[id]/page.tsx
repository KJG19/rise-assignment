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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-2">{program.name}</h1>
      <p className="mb-4">{program.description}</p>
      <ul className="mb-6 space-y-1">
        <li>
          <strong>Dates: </strong>
          {program.startDate} - {program.endDate}
        </li>
        <li>
          <strong>Coach: </strong>
          {program.coach}
        </li>
        <li>
          <strong>Visibility: </strong>
          {program.visibility}
        </li>
        <li>
          <strong>Capacity: </strong>
          {program.registered}/{program.capacity} ({spotsLeft} spots left)
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Sessions</h2>

      <ul className="list-disc pl-5">
        {program.session?.map((session, index) => (
          <li key={index}>
            {session.date} @ {session.time}
          </li>
        )) ?? <li>No sessions found</li>}
      </ul>
    </div>
  );
}
