"use client";

interface LoadingOverlayProps {
  visible: boolean;
  title: string;
  subtitle: string;
}

export default function LoadingOverlay({ visible, title, subtitle }: LoadingOverlayProps) {
  return (
    <div
      className={`fixed inset-0 bg-[rgba(250,250,250,0.96)] backdrop-blur-sm flex flex-col items-center justify-center z-[1000] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-10 h-10 rounded-full border-[3px] border-border border-t-primary animate-spin mb-5" />
      <div className="text-lg font-bold mb-1">{title}</div>
      <div className="text-[13px] text-text-muted max-w-[360px] text-center px-6">{subtitle}</div>
    </div>
  );
}
