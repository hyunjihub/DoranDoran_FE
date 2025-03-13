export default function CameraIcon({ type = 'default', size }: { type: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 13.5C15.561 13.5 13.5 15.561 13.5 18C13.5 20.439 15.561 22.5 18 22.5C20.439 22.5 22.5 20.439 22.5 18C22.5 15.561 20.439 13.5 18 13.5Z"
        fill={`${type === 'purple' ? '#7B3796' : '#030712'}`}
      />
      <path
        d="M30 7.5H26.121L22.0605 3.4395C21.7793 3.15818 21.3978 3.00008 21 3H15C14.6022 3.00008 14.2207 3.15818 13.9395 3.4395L9.879 7.5H6C4.3455 7.5 3 8.8455 3 10.5V27C3 28.6545 4.3455 30 6 30H30C31.6545 30 33 28.6545 33 27V10.5C33 8.8455 31.6545 7.5 30 7.5ZM18 25.5C13.935 25.5 10.5 22.065 10.5 18C10.5 13.935 13.935 10.5 18 10.5C22.065 10.5 25.5 13.935 25.5 18C25.5 22.065 22.065 25.5 18 25.5Z"
        fill={`${type === 'purple' ? '#7B3796' : '#030712'}`}
      />
    </svg>
  );
}
