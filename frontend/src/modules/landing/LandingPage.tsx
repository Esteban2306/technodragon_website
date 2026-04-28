'use client';

import BusinessAreasSection from './BusinessAreasSection/BusinessAreasSection';
import HeroSection from './hero/HeroSection';
import LogoLoopSection from './logoLoop/logoLoopSection';
import RepairService from './repairService/RepairService';
import ContactSection from './location&contact/location-contact';
import CTASection from './cta/CtaSection';
import { ProductSkeletonGrid } from '../catalog/components/ProductSkeletonGrid';
import FeaturedProductsSection from './productsPreview/FeaturedProductsSection';

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col gap-10 overflow-x-hidden">
        <HeroSection></HeroSection>
        <LogoLoopSection></LogoLoopSection>
        <FeaturedProductsSection />
        <RepairService></RepairService>
        <BusinessAreasSection></BusinessAreasSection>
        <CTASection></CTASection>
        <ContactSection></ContactSection>
      </div>
    </>
  );
}
