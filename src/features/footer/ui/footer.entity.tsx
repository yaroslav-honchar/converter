import React from "react"
import { LinkRoot } from "@/shared/components"

export const Footer: React.FC = () => {
  return (
    <footer className={"pt-9 pb-6 bg-secondary relative z-10"}>
      <div className="container">
        <p className={"text-center"}>
          Developed by{" "}
          <LinkRoot
            href="https://www.linkedin.com/in/yaroslav-honchar-04649020b/"
            target={"_blank"}
            rel={"noreferrer nofollow"}
          >
            Yroslav Honchar
          </LinkRoot>
        </p>
      </div>
    </footer>
  )
}
