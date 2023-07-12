import { IconStatuses } from "utils/types";

const LoadingSpinner = () => {
  return (
    <svg
      className="animate-spin"
      fill="none"
      height="28"
      viewBox="0 0 48 48"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
        stroke="#6FA8DC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
};

const SuccessIcon = () => {
  return (
    <svg viewBox="0 0 20 19.84" height="36" width="36">
      <path
        stroke="#339933"
        d="M15.39,5.66a.37.37,0,0,0-.52,0L8,13.39,5.09,11.06a.38.38,0,1,0-.47.59L7.85,14.2a.38.38,0,0,0,.52,0l7.06-8A.38.38,0,0,0,15.39,5.66Z"
      />
    </svg>
  );
};

export const ErrorIcon = () => {
  return (
    <svg viewBox="0 0 256 256" height="36" width="36">
      <rect fill="none" height="36" width="36" />
      <line
        stroke="#A70000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="200"
        x2="50"
        y1="50"
        y2="200"
      />
      <line
        stroke="#A70000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="200"
        x2="50"
        y1="200"
        y2="50"
      />
    </svg>
  );
};

export const LoadingToSuccess = ({ status }: { status: IconStatuses }) => {
  const iconMap: { [key in IconStatuses]: JSX.Element | null } = {
    [IconStatuses.OFF]: null,
    [IconStatuses.LOADING]: <LoadingSpinner />,
    [IconStatuses.SUCCESS]: <SuccessIcon />,
    [IconStatuses.ERROR]: <ErrorIcon />,
  };
  return iconMap[status];
};
