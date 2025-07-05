export default function NavbarUserSection({
  profileImage,
  onClick,
}: {
  profileImage: string;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center gap-x-4">
      <button className="cursor-pointer">
        <img src="/images/icons/like.svg" alt="like_icon" />
      </button>
      <button className="cursor-pointer">
        <img src="/images/icons/bell.svg" alt="bell_icon" />
      </button>
      <button onClick={onClick}>
        <img
          className="h-7 w-7 cursor-pointer rounded-full object-cover"
          src={profileImage}
          alt="profileImg"
        />
      </button>
    </div>
  );
}
