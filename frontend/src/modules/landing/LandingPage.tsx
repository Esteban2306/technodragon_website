"use client"

import HeroSection from './hero/HeroSection';
import LogoLoopSection from './logoLoop/logoLoopSection';
import ProductsPreviewSection from './productsPreview/ProductsPreviewSection';
import { producPreviewData } from './productsPreview/productPreview.data';

export default function LandingPage() {
  return (
    <>
      <HeroSection></HeroSection>
      <LogoLoopSection></LogoLoopSection>
      <ProductsPreviewSection products={producPreviewData}></ProductsPreviewSection>
    </>
  );
}
