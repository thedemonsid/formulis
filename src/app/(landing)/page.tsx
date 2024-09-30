import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Trophy, Users, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import UserAvatar from "@/components/UseAvatar";

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session;
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Formulis</h1>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                
              <UserAvatar image={session?.user?.image || null}></UserAvatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut></SignOut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignIn></SignIn>
          )}
        </div>
      </header>

      <main>
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">Welcome to Formulis</h2>
            <p className="text-xl mb-8">
              Unlock the power of knowledge through engaging quizzes!
            </p>
            <Button size="lg">Start Your Quiz Journey</Button>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Formulis?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-12 w-12 mb-4" />}
                title="Diverse Question Formats"
                description="Experience a variety of question types, from multiple-choice to interactive puzzles."
              />
              <FeatureCard
                icon={<Users className="h-12 w-12 mb-4" />}
                title="Collaborative Learning"
                description="Create and share quizzes with friends, classmates, or colleagues."
              />
              <FeatureCard
                icon={<Trophy className="h-12 w-12 mb-4" />}
                title="Personal Growth Tracking"
                description="Monitor your progress and see your knowledge expand over time."
              />
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Expand Your Horizons?
            </h2>
            <p className="text-xl mb-8">
              Join the Formulis community and embark on a journey of continuous
              learning!
            </p>
            <Button size="lg">Create Your Free Account</Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Formulis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">{description}</p>
      </CardContent>
    </Card>
  );
}
