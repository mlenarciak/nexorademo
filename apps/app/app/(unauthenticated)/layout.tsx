import { ModeToggle } from "@repo/design-system/components/mode-toggle";
import Image from "next/image";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-muted" />
      <div className="relative z-20 flex items-center">
        <Image
          alt="Nexora"
          src="/logos/nexora-signin-light.png"
          width={200}
          height={40}
          className="block h-8 w-auto dark:hidden"
          priority
        />
        <Image
          alt="Nexora"
          src="/logos/nexora-signin-dark.png"
          width={200}
          height={40}
          className="hidden h-8 w-auto dark:block"
          priority
        />
      </div>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="relative z-20 mt-auto text-primary">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;Nexora unifies bookings, operations, and accounting into one
            calm workspace — so hospitality teams can focus on guests, not
            systems.&rdquo;
          </p>
          <footer className="text-sm">The Nexora Team</footer>
        </blockquote>
      </div>
    </div>
    <div className="lg:p-8">
      <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
