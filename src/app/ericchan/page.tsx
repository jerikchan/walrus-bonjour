'use client'

import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import { useParams } from 'next/navigation'
import NotFound from '../not-found'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  const params = useParams<{ username: string }>()
  const username = params.username

  if (username && !/^0x/.test(username)) {
    return <NotFound />
  }

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 break-words">
            {`I'm Eric, a digital nomad, freelancer, and front-end developer.`}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
            I have over two years of experience as a digital nomad, having lived and worked remotely in places like Dali, Yunnan, China, Bali, Indonesia, and Thailand, traveling while working on various remote projects.
            </p>
            <p>
            {`Throughout my career, I have primarily worked as a front-end engineer, taking on development tasks within companies. I've contributed to projects like no-code SaaS applications, web and cross-platform component libraries, rich text editors, large file upload tools, private npm systems, and automated operation and maintenance deployment systems.`}
            </p>
            <p>
            {`In the past two years of freelancing, I've worked on various projects, including data analysis/management systems, B2B/C websites, AI/LLM applications, and Web3/Dapp projects, in the capacity of a part-time, collaborative, or outsourced freelancer. I have experience in building projects from the ground up, handling everything from tech stack selection to deployment and maintenance.`}
            </p>
            {/* <p>
              Today, I’m the founder of Planetaria, where we’re working on
              civilian space suits and manned shuttle kits you can assemble at
              home so that the next generation of kids really <em>can</em> make
              it to orbit — from the comfort of their own backyards.
            </p> */}
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/duebass21" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="https://www.instagram.com/eric21chan/" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink href="https://github.com/jerikchan" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/jerik-chan-067556268/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:jerikchan@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              jerikchan@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
