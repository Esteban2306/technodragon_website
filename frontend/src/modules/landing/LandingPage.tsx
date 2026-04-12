"use client"

import BusinessAreasSection from './BusinessAreasSection/BusinessAreasSection';
import HeroSection from './hero/HeroSection';
import LogoLoopSection from './logoLoop/logoLoopSection';
import ProductsPreviewSection from './productsPreview/ProductsPreviewSection';
import RepairService from './repairService/RepairService';
import { producPreviewData } from './productsPreview/productPreview.data';
import ContactSection from './location&contact/location-contact';
import CTASection from './cta/CtaSection';

export default function LandingPage() {
  return (
    <>
    <div className='flex flex-col gap-10'>
      <HeroSection></HeroSection>
      <LogoLoopSection></LogoLoopSection>
      <ProductsPreviewSection products={producPreviewData}></ProductsPreviewSection>
      <RepairService></RepairService>
      <BusinessAreasSection></BusinessAreasSection>
      <CTASection></CTASection>
      <ContactSection></ContactSection>
      </div>
    </>
  );
}
