import BackgroundGL from '@/components/gl/BackgroundGL';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TwoWorlds from '@/components/sections/TwoWorlds';
import Collections from '@/components/sections/Collections';
import Marquee from '@/components/sections/Marquee';
import Business from '@/components/sections/Business';
import Bespoke from '@/components/sections/Bespoke';
import Occasions from '@/components/sections/Occasions';
import WhyHavenza from '@/components/sections/WhyHavenza';
import Enquiry from '@/components/sections/Enquiry';
import UIProvider from '@/components/ui/UIProvider';
import CollectionDrawer from '@/components/ui/CollectionDrawer';
import FloatingUI from '@/components/ui/FloatingUI';
import PageEffects from '@/components/ui/PageEffects';

export default function HomePage() {
  return (
    <UIProvider>
      <BackgroundGL />
      <TopBar />
      <Header />
      <main id="home">
        <Hero />
        <TwoWorlds />
        <Collections />
        <Marquee />
        <Business />
        <Bespoke />
        <Occasions />
        <WhyHavenza />
        <Enquiry />
      </main>
      <Footer />
      <CollectionDrawer />
      <FloatingUI />
      <PageEffects />
    </UIProvider>
  );
}
