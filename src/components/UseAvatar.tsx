import { AvatarPlaceholderComponent } from "./avatar-placeholder";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({ image }: { image: string | null }) {
  console.log("image", image);

  return (
    <div className="w-fit px-1 cursor-pointer">
      {image ? (
        <Avatar>
          <AvatarImage src={image} />
        </Avatar>
      ) : (
        <AvatarPlaceholderComponent></AvatarPlaceholderComponent>
      )}
    </div>
  );
}
