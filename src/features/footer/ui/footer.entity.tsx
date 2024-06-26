import React from "react"

import { Icon, LinkRoot } from "@/shared/components"

type AuthorType = {
  icon: "behance" | "github"
  textHolder: string
  name: string
  link: string
}

const authors: AuthorType[] = [
  {
    icon: "behance",
    textHolder: "Designer by",
    name: "Vladyslav Surma",
    link: "https://www.behance.net/-fyuse",
  },
  {
    icon: "github",
    textHolder: "Developed by",
    name: "Yroslav Honchar",
    link: "https://www.linkedin.com/in/yaroslav-honchar-04649020b/",
  },
]

export const Footer: React.FC = () => {
  return (
    <footer className={"pt-9 pb-6 bg-secondary relative z-10"}>
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {authors.map(({ link, name, icon, textHolder }: AuthorType) => (
            <p
              key={name}
              className={
                "flex items-center flex-wrap gap-1 text-[#B3ADDA] text-md sm:text-xl font-light"
              }
            >
              <Icon
                name={icon}
                className={"inline-block w-[1.25em] min-w-[1.25em] min-h-[1.25em] h-[1.25em]"}
              />
              <span>{textHolder}</span>
              <LinkRoot
                className={"font-light text-inherit"}
                href={link}
                target={"_blank"}
                rel={"noreferrer nofollow"}
              >
                {name}
              </LinkRoot>
            </p>
          ))}
        </div>
      </div>
    </footer>
  )
}
