import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cn } from "@/lib/utils";

type SocialIconProps = {
  url: string;
  className?: string;
  icon: IconDefinition;
};

const SocialIcon = ({ className, url, icon }: SocialIconProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener nofollow noreferrer"
      className={cn(
        "mb-2 flex size-10 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-foreground hover:text-white",
        className,
      )}
    >
      <FontAwesomeIcon icon={icon} className="size-5" />
    </a>
  );
};

export default SocialIcon;
