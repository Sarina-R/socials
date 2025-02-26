import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const registrationFees = [
  {
    category: "Challenge/ Air (Student older than 19 years old)",
    earlyBird: "780 CAD",
    regular: "850 CAD",
    late: "980 CAD",
    additionalMember: "250 CAD",
    condition: "1 coach/1 to 3 members",
  },
  {
    category: "FIRA Youth All U 19 leagues",
    earlyBird: "200 CAD",
    regular: "220 CAD",
    late: "260 CAD",
    additionalMember: "—",
    condition: "Each member",
  },
  {
    category: "Youth coach/Parents",
    earlyBird: "200 CAD",
    regular: "220 CAD",
    late: "260 CAD",
    additionalMember: "—",
    condition: "Each coach/Parents",
  },
  {
    category: "Home Simulation U 19",
    earlyBird: "120 CAD",
    regular: "160 CAD",
    late: "180 CAD",
    additionalMember: "—",
    condition: "Each member",
  },
  {
    category: "FIRA Frontiers Camp Participant",
    earlyBird: "TDB",
    regular: "TDB",
    late: "TDB",
    additionalMember: "—",
    condition: "Includes registration and teaching materials for each member",
  },
];

export default function RegistrationTable() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">Guidelines</h2>
      <p className="font-semibold text-lg mb-4">Guidelines and registration.</p>

      <h3 className="text-xl font-semibold mb-2">Registration fee</h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-40">Category</TableHead>
            <TableHead className="min-w-40">
              Early bird Sep 15 st to Oct...
            </TableHead>
            <TableHead className="min-w-40">
              Regular Oct 16 st to 30th...
            </TableHead>
            <TableHead className="min-w-40">
              Late Dec 11th to 21th, 2024
            </TableHead>
            <TableHead className="min-w-40">Additional member</TableHead>
            <TableHead className="min-w-40">Condition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrationFees.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.earlyBird}</TableCell>
              <TableCell>{item.regular}</TableCell>
              <TableCell>{item.late}</TableCell>
              <TableCell>{item.additionalMember}</TableCell>
              <TableCell>{item.condition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
