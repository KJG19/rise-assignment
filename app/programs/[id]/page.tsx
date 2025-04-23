import { Program } from "@/types/program";

interface PageProps {
  params: Promise<{ id: string }>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function ProgramPage({ params }: PageProps) {
  const { id } = await params;

  const [response] = await Promise.all([
    fetch(`https://672d2f78fd8979715641a684.mockapi.io/information/${id}`, {
      next: { revalidate: 60 },
    }),
    delay(1000),
  ]);

  if (!response.ok) throw new Error("Program not found");
  const program: Program = await response.json();
  const spotsLeft = program.capacity - program.registered;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900">
          {program.name}
        </h1>
        <p className="text-gray-700">{program.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          Coach: {program.coach}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          Dates: {program.startDate} → {program.endDate}
        </span>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
          {program.visibility}
        </span>
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
          Spots Remaining: {spotsLeft}
        </span>
      </div>

      <div className="bg-white  rounded-2xl shadow p-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 ">
            {program.registered}
          </div>
          <div className="text-gray-500 text-sm">Registered</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 ">
            {program.capacity}
          </div>
          <div className="text-gray-500 text-sm">Capacity</div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Sessions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {program.session?.length ? (
            program.session.map((session, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <div className="font-medium text-gray-800">{session.date}</div>
                <div className="text-gray-500">{session.time}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-600">No sessions available</div>
          )}
        </div>
      </div>
    </div>
  );
}
