import LogoLoop from '@/src/shared/components/LogoLoop';
import { techLogo } from './data';

export default function LogoLoopSection() {
  return (
    <section className="w-full overflow-hidden my-10 z-20">
      <div className="relative w-full ">
        <LogoLoop
          logos={techLogo}
          speed={100}
          direction="left"
          logoHeight={80}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#560F0F"
          ariaLabel="Technology partners"
          className='overflow-y-hidden'
        />
      </div>
    </section>
  );
}
