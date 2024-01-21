export default function GetAboardIcon({ className }: { className?: string }) {
  return (
    <svg
      width="1000"
      height="1000"
      className={`${className}`}
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="150" cy="150" r="115" stroke="current" strokeWidth="70" />
      <circle cx="837" cy="440" r="115" stroke="current" strokeWidth="70" />
      <circle cx="426" cy="850" r="115" stroke="current" strokeWidth="70" />
      <path
        d="M152.999 272V420C152.999 431.046 161.953 440 172.999 440H736.999"
        stroke="current"
        strokeWidth="60"
        strokeMiterlimit="16"
        strokeDasharray="300 75"
      />
      <path
        d="M837 564V660H437V732"
        stroke="current"
        strokeWidth="60"
        strokeLinejoin="round"
        strokeDasharray="300 75"
      />
    </svg>
  );
}
