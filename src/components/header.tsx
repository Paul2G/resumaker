import { ModeToggle } from './mode-toggle';

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full flex p-2 border border-b">
      <h1 className="my-auto text-xl font-bold uppercase italic px-4">
        Resume Maker
      </h1>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
}

export type HeaderProps = {
  children?: React.ReactNode;
};
