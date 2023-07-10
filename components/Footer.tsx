import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center sm:justify-between justify-center">
      <div className="hidden sm:flex"></div>

      <div className="hidden sm:flex italic text-sm">
        Created by
        <a
          className="hover:opacity-50 mx-1"
          href="https://languageguessr.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          Sifan
        </a>
        based on the content of
        <a
          className="hover:opacity-50 ml-1"
          href="https://www.indexventures.com/rewardingtalent/handbook"
          target="_blank"
          rel="noreferrer"
        >
          Reward Talent
        </a>
        .
      </div>
    </div>
  );
};
