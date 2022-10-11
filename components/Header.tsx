import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from 'next-auth/react'

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="font-bold text-decoration-none text-[#000] inline-block" data-active={isActive('/')}> Feed </a>
      </Link>
      <style jsx>{`
        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <a className="font-bold text-decoration-none inline-block" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        <style jsx>
          {`
            a {
              color: var(--geist-foreground);
            }

            .left a[data-active='true'] {
              color: grey;
            }
            a + a {
              margin-left: 1rem;
            }
          `}
        </style>
      </div>
    );
    right = (
      <div className="ml-auto">
        <p>Validating session ... </p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="ml-auto">
        <Link href="/api/auth/signin">
          <a className="text-decoration-none inline-block" data-active={isActive('/signup')}> Login </a>
        </Link>
        <style jsx>
        {`
            a {
              color: var(--geist-foreground);
            }

            a + a {
              margin-left: 1rem;
            }

            .right a {
              border: 1px solid var(--geist-foreground);
              padding: 0.5rem 1rem;
              border-radius: 3px;
            }
        `}
        </style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="font-bold text-decoration-none inline-block" data-active={isActive('/')}> Feed </a>
        </Link>
        <Link href="/draft">
          <a data-active={isActive('/drafts')}> My Drafts </a>
        </Link>
        <style jsx>
          {`
            a {
              color: var(--geist-foreground);
            }

            .left a[data-active='true'] {
              color: gray;
            }

            a + a {
              margin-left: 1rem;
            }
          `}
        </style>
      </div>
    );

    right = (
      <div className="right ml-auto">
        <p className="inline-block pr-4 text-xs"> {session.user.name} ({session.user.email}) </p>
        <Link href="/create">
          <button className="border-none">
            <a className="text-decoration-none inline-block"> New Post </a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a> Logout </a>
        </button>
        <style jsx>
          {`
            a { 
              color: var(--geist-foreground);
            }

            a + a {
              margin-left: 1rem;
            }

            .right a {
              border: 1px solid var(--geist-foreground);
              padding: 0.5rem 1rem;
              border-radius: 3px;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <nav className="flex p-8 items-center">
      {left}
      {right}
    </nav>
  );
};

export default Header;
