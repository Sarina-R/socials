import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
    earlyBird: "TBD",
    regular: "TBD",
    late: "TBD",
    additionalMember: "—",
    condition: "Includes registration and teaching materials for each member",
  },
];

export default function RegistrationTable() {
  return (
    <motion.div
      className="w-full max-w-5xl mx-auto p-6 dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-800"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold mb-2 tracking-tight"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Guidelines
      </motion.h2>

      <motion.h3
        className="text-xl font-semibold mb-4"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Registration Fee
      </motion.h3>

      <div className="overflow-hidden rounded-xl border dark:border-neutral-700">
        <Table>
          <TableHeader className="dark:bg-neutral-800">
            <motion.tr
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <TableHead className="text-black dark:text-white min-w-44 font-semibold py-4">
                Category
              </TableHead>
              <TableHead className="text-black dark:text-white min-w-40 font-semibold py-4">
                Early Bird (Sep 15 - Oct...)
              </TableHead>
              <TableHead className="text-black dark:text-white min-w-40 font-semibold py-4">
                Regular (Oct 16 - 30...)
              </TableHead>
              <TableHead className="text-black dark:text-white min-w-40 font-semibold py-4">
                Late (Dec 11 - 21, 2024)
              </TableHead>
              <TableHead className="text-black dark:text-white min-w-40 font-semibold py-4">
                Additional Member
              </TableHead>
              <TableHead className="text-black dark:text-white min-w-40 font-semibold py-4">
                Condition
              </TableHead>
            </motion.tr>
          </TableHeader>

          <TableBody>
            {registrationFees.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                viewport={{ once: true }}
                className="border-b border-neutral-700"
              >
                <TableCell className="p-4 text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white">
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.category}
                  </motion.span>
                </TableCell>
                <TableCell className="text-center py-4 text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.earlyBird}
                  </motion.span>
                </TableCell>
                <TableCell className="text-center py-4 text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.regular}
                  </motion.span>
                </TableCell>
                <TableCell className="text-center py-4 text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.late}
                  </motion.span>
                </TableCell>
                <TableCell className="text-center py-4 text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.additionalMember}
                  </motion.span>
                </TableCell>
                <TableCell className="text-center py-4 text-neutral-700 hover:text-black dark:text-neutral-200 dark:hover:text-white">
                  <motion.span
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.condition}
                  </motion.span>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
