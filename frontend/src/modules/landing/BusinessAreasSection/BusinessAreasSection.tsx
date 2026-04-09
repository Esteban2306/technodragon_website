import MagicBento from '@/src/shared/components/MagicBento';

export default function BusinessAreasSection() {
  return (
    <section>
      <MagicBento
        textAutoHide={true}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt
        enableMagnetism={false}
        clickEffect
        spotlightRadius={180}
        particleCount={12}
        glowColor="120, 0, 40"
        disableAnimations={false}
      />
    </section>
  );
}
