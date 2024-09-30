import { auth } from "../auth";
import { AvatarPlaceholderComponent } from "./avatar-placeholder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserAvatar() {
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;

  return (
    <div className="w-fit px-1">
      {session.user.image ? (
        <Avatar>
          <AvatarImage src={session.user.image} />
        </Avatar>
      ) : (
        <AvatarPlaceholderComponent></AvatarPlaceholderComponent>
      )}
    </div>
  );
}
