import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6 sm:py-12">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <div className="mt-4">
        <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />
      </div>
      <section className="mt-8" aria-label="링크 목록">
        <LinkList links={profile.links} />
      </section>
      <footer className="mt-auto pt-10 text-center text-xs text-neutral-400">
        링크나무
      </footer>
    </main>
  );
}
