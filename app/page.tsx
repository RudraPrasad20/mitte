import TokenCreationCard from "@/components/ShowCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground text-balance">
              Launch Your Token Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
              Just connect your wallet and create
            </p>
          </div>

          <TokenCreationCard />
        </div>
      </main>
    </div>
  );
}
