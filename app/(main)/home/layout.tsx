export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-6">
      <div className="relative w-full h-32 overflow-hidden rounded-lg">
        <img
          src="https://jamhospital.ir/uploads/en/pages/tehrancity.jpg"
          className="w-full h-full object-cover"
        />
        <h3 className="absolute bottom-2 left-2 text-white text-lg font-bold bg-black bg-opacity-80 px-2 py-1 rounded">
          Iran 2025 FIRA Open Competition
        </h3>
      </div>

      {children}
    </div>
  );
}
