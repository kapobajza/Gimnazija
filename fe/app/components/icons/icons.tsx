import { cn } from '@/lib/utils';
import { useId } from 'react';

type IconProps = {
  className?: string;
  width?: string;
  height?: string;
};

const Email = ({ className, width = '24', height = '24' }: IconProps) => {
  const patternId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn('h-6 w-6 shrink-0', className)}
    >
      <path
        fill={`url(#${patternId})`}
        d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
      ></path>
      <linearGradient id={patternId} x2="1" y2="1">
        <stop offset="0%" stopColor="#82AAEE" />
        <stop offset="100%" stopColor="#CD75ED" />
      </linearGradient>
    </svg>
  );
};

const Address = ({ className, width = '24', height = '24' }: IconProps) => {
  const patternId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn('h-6 w-6 shrink-0', className)}
    >
      <path
        fill={`url(#${patternId})`}
        d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"
      ></path>
      <linearGradient id={patternId} x2="1" y2="1">
        <stop offset="0%" stopColor="#82AAEE" />
        <stop offset="100%" stopColor="#CD75ED" />
      </linearGradient>
    </svg>
  );
};

export { Email, Address };
