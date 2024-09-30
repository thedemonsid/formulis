import SignIn from "@/components/sign-in";
import UserAvatar from "@/components/UseAvatar";

export default function Home() {
  return (
    <div className="text-center">
      <SignIn></SignIn>
      <UserAvatar></UserAvatar>
    </div>
  );
}
