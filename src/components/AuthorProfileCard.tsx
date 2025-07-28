// src/components/AuthorProfileCard.tsx
"use client";

import Image from 'next/image';
import { Button } from './ui/button';
import { Linkedin } from 'lucide-react';

export const AuthorProfileCard = () => {
  return (
    <div className="w-64 rounded-xl border bg-background shadow-2xl p-4 text-foreground">
      <div className="flex items-center gap-4">
        <Image
          src="https://media.licdn.com/dms/image/v2/D5603AQFL8j5rGlEe6Q/profile-displayphoto-shrink_800_800/B56ZQW9G2dGQAc-/0/1735551905650?e=1756339200&v=beta&t=E4AWEF93tBYZkh3E3TmomcY9tFXxQVHBMa3mhrxySGs"
          alt="IJAS A H"
          width={56}
          height={56}
          className="rounded-full border-2 border-primary/50"
        />
        <div>
          <h4 className="font-bold text-lg">IJAS A H</h4>
          <p className="text-sm text-muted-foreground">AI & Full-Stack Developer</p>
        </div>
      </div>
      <a
        href="https://www.linkedin.com/in/ijas-ah/?originalSubdomain=in"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4"
      >
        <Button className="w-full" size="sm">
          <Linkedin className="mr-2 h-4 w-4" />
          View Profile
        </Button>
      </a>
    </div>
  );
};
