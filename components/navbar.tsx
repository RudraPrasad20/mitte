import Wallet from "./wallet";

const Navbar = () => {
  return (
    <nav className="w-full bg-background border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-extrabold text-foreground">Mitte</span>
        </div>
        <Wallet />
      </div>
    </nav>
  );
};

export default Navbar;
