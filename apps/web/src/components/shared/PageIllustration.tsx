import Image from "next/image";

export function PageIllustration() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 transform">
        <Image
          className="max-w-none"
          src="/images/stripes.svg"
          width={768}
          height={768}
          alt=""
          priority
        />
      </div>
      <div className="absolute -top-32 left-1/2 hidden -translate-x-1/2 sm:block sm:ml-[40vw] md:ml-[580px]">
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 opacity-50 blur-[160px]" />
      </div>
      <div className="absolute left-1/2 top-[420px] hidden -translate-x-1/2 sm:block sm:ml-[28vw] md:ml-[380px]">
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 to-gray-900 opacity-50 blur-[160px]" />
      </div>
      <div className="absolute left-1/2 top-[640px] -ml-[40vw] -translate-x-1/2 md:-ml-[300px]">
        <div className="h-56 w-56 rounded-full bg-gradient-to-tr from-blue-500 to-gray-900 opacity-40 blur-[120px] sm:h-80 sm:w-80 sm:opacity-50 sm:blur-[160px]" />
      </div>
    </div>
  );
}
