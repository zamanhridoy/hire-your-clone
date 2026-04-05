import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import InteractiveBg from "@/components/InteractiveBg";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <main className="grow relative">
      <CustomCursor />
      <InteractiveBg />
      <div className="relative z-10">
      <Header />
      <Hero />
      <Services />
      <div className="py-20 relative px-6 text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        <h3 className="text-2xl font-bold text-slate-800 mb-2 italic">&quot;The only way to truly scale is to duplicate your logic.&quot;</h3>
        <p className="text-slate-400 text-sm tracking-widest uppercase font-bold">Founding Vision — 2026</p>
      </div>
      <BookingForm />
      <Footer />
      </div>
    </main>
  );
}
