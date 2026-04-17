import type { SVGProps } from "react";

const base = (width = 14, height = 14): SVGProps<SVGSVGElement> => ({
  width,
  height,
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": true,
});

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(14, 14)} {...props}>
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(12, 12)} {...props}>
      <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.89a1.5 1.5 0 000-2.54L6.3 2.84z" />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden
      {...props}
    >
      <circle cx={10} cy={10} r={7.5} />
      <path d="M10 6v4l2.5 2.5" strokeLinecap="round" />
    </svg>
  );
}

export function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden
      {...props}
    >
      <circle cx={10} cy={10} r={7.5} />
      <circle cx={10} cy={10} r={3.5} />
    </svg>
  );
}

export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(16, 16)} {...props}>
      <path d="M10 2l1.5 4L15 7l-3.5 1.5L10 12l-1.5-3.5L5 7l3.5-1L10 2zM16 12l.9 2.1L19 15l-2.1.9L16 18l-.9-2.1L13 15l2.1-.9L16 12z" />
    </svg>
  );
}

export function LightbulbIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
      {...props}
    >
      <path d="M10 2a5 5 0 00-3 9v2h6v-2a5 5 0 00-3-9zM8 17h4" strokeLinecap="round" />
    </svg>
  );
}

export function PyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2C9.5 2 8 3.3 8 5v2h5v1H5.5C3.5 8 2 9.5 2 12s1.5 4 3.5 4H8v-2c0-2 1.5-3 3.5-3h3c2 0 3-1 3-3V5c0-1.7-1.5-3-3.5-3h-2zm-1 2a1 1 0 110 2 1 1 0 010-2zm10.5 7H19v2c0 2-1.5 3-3.5 3h-3c-2 0-3 1-3 3v2c0 1.7 1.5 3 3.5 3h2c2.5 0 4-1.3 4-3v-2h-5v-1h5.5c2 0 3.5-1.5 3.5-4s-1.5-3-2.5-3zM13 18a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
}

export function NotesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden
      {...props}
    >
      <path d="M4 3h9l3 3v11a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" strokeLinejoin="round" />
      <path d="M13 3v4h3M6 10h8M6 13h8M6 16h5" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
      {...props}
    >
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RestartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      aria-hidden
      {...props}
    >
      <path
        d="M16 10a6 6 0 11-2-4.5M16 3v3h-3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
      {...props}
    >
      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
    </svg>
  );
}
