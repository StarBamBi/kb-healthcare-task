import GNB from "@/widgets/gnb/GNB";
import LNB from "@/widgets/lnb/LNB";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <GNB />
      <div className="flex flex-1">
        <LNB />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
