import PredictiveArc from '@/components/originkit/ui/predictive-arc-base';

const BottomBanner = () => {
  return (
    <div className="relative h-56 w-full min-w-0 after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-neutral-100 after:content-[''] dark:after:bg-neutral-900">
      <PredictiveArc
        background="#030303"
        baseColor="#F6F2F2"
        accentColor="#565555"
        highlight="#615F5F"
        density={32}
        dotSize={137}
        speed={100}
        arch={{ peak: 100, archHeight: 0, thickness: 260, falloff: 600 }}
        pointer={{ enabled: true, radius: 236, strength: 18 }}
      />
    </div>
  );
};

export default BottomBanner;
