interface ProfilePicProps {
  img: string;
  size?: number;
}

export function ProfilePic({ img, size = 12 }: ProfilePicProps) {
  return (
    <div className={`overflow-hidden w-${size} h-${size} rounded-full aspect-square`}>
      <a href="" className="block h-full">
        <img src={img} className="object-cover w-full h-full" alt="" />
      </a>
    </div>
  );
}
