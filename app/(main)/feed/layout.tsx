export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) return "Good morning ☀️";
    if (hours >= 12 && hours < 15) return "Good noon 🌞";
    if (hours >= 15 && hours < 18) return "Good afternoon 🌤️";
    if (hours >= 18 && hours < 21) return "Good evening 🌆";
    return "Good night 🌙";
  };

  return (
    <div className="md:flex gap-4">
      <div className="flex-1">{children}</div>

      <div className="w-64 mt-6 p-4 max-h-max border rounded-xl">
        <h4 className="text-lg">{getGreeting()}</h4>
        <div className="pt-2 text-sm">
          <p>Welcome to Bettermode Community</p>
          <p className="pt-1">
            Connect, share, and engage with community and build relationships.
          </p>
        </div>
      </div>
    </div>
  );
}
