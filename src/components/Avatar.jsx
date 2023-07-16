import { createImageFromInitials } from "../utils/image-utils";

export default function Avatar({ avatar, firstLetter = "-" }) {
  return (
    <img
      loading="lazy"
      className="h-16 w-16 rounded-full"
      src={avatar ?? createImageFromInitials({ size: 64, letter: firstLetter })}
      onError={(e) => {
        e.target.src = createImageFromInitials({
          size: 64,
          letter: firstLetter,
        });
      }}
      alt="icon"
    />
  );
}
