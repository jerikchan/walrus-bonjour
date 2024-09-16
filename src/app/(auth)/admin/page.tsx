'use client'

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
import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LucideMessageCircleWarning, LucideFlame, Loader2, LucideEdit3 } from "lucide-react"
import { Button } from '@/components/Button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button as UIButton } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCopyToClipboard } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileUploader } from "@/components/file-uploader"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

function DialogUploader({ avatarUrl }: { avatarUrl: string }) {
  const [files, setFiles] = useState<File[]>([])

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <UIButton variant="outline">
          Upload files {files.length > 0 && `(${files.length})`}
        </UIButton> */}
        <div className="inline-block relative cursor-pointer">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatarUrl} alt="" />
            <AvatarFallback>0x</AvatarFallback>
          </Avatar>
          <LucideEdit3 className="w-5 h-5 p-1 border bg-background rounded-full absolute right-0 bottom-0 z-10" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          maxFileCount={1}
          maxSize={50 * 1024 * 1024}
          onValueChange={setFiles}
        />
      </DialogContent>
    </Dialog>
  )
}

const formSchema = z.object({
  username: z.string().min(2).max(150),
  x_link: z.string().min(2).max(150),
  instagram_link: z.string().min(2).max(150),
  github_link: z.string().min(2).max(150),
  linkedin_link: z.string().min(2).max(150),
  email: z.string().min(2).max(150),
  avatar: z.string().min(2).max(150),
  title: z.string().min(2).max(150),
  description: z.string().min(2).max(1500),
})

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
  const currentAccount = useCurrentAccount();
	const [open, setOpen] = useState(false);
  const [copiedText, copy] = useCopyToClipboard()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: "",
      username: "",
      title: "",
      description: "",
      x_link: "",
      instagram_link: "",
      github_link: "",
      linkedin_link: "",
      email: "",
    },
  })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bonjour.walrus.site'
  const username = form.getValues().username
  const avatarUrl = form.getValues().avatar
  const liveLink = username ? `${siteUrl}/${username}.html` : ''
  const hasRegister = !!currentAccount

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: 'Submit Success!'
      })
    }, 1500)
  }

  function handleCopy(text: string) {
    copy(text)
      .then(() => {
        // console.log('Copied!', { text })
        toast({
          title: 'Copied',
        })
      })
      .catch(error => {
        // console.error('Failed to copy!', error)
        toast({
          variant: 'destructive',
          title: 'Failed to copy!',
          description: error.message,
        })
      })
  }

  useEffect(() => {
    if (!currentAccount) {
      setOpen(true)
    }
  }, [currentAccount])

  useEffect(() => {
    if (currentAccount) {
      form.setValue('username', 'eric')
      form.setValue('title', `I'm Eric, a digital nomad, freelancer, and front-end developer.`)
      form.setValue('description', `I have over two years of experience as a digital nomad, having lived and worked remotely in places like Dali, Yunnan, China, Bali, Indonesia, and Thailand, traveling while working on various remote projects. Throughout my career, I have primarily worked as a front-end engineer, taking on development tasks within companies. I've contributed to projects like no-code SaaS applications, web and cross-platform component libraries, rich text editors, large file upload tools, private npm systems, and automated operation and maintenance deployment systems.`)
      form.setValue('x_link', 'https://x.com/duebass21')
      form.setValue('instagram_link', 'https://www.instagram.com/eric21chan/')
      form.setValue('github_link', 'https://github.com/jerikchan')
      form.setValue('linkedin_link', 'https://www.linkedin.com/in/jerik-chan-067556268/')
      form.setValue('email', 'jerikchan@gmail.com')
      form.setValue('avatar',  portraitImage.src)
    } else {
      form.reset()
    }
  }, [currentAccount, form])
  
  return (
    <Container className="mt-16 sm:mt-32">
      {!currentAccount && <ConnectModal
        trigger={
          <Alert className="mb-8">
            <LucideMessageCircleWarning className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription className="space-x-4">
              <span>You have to connect your address first!</span>
              <UIButton disabled={!!currentAccount}>{currentAccount ? 'Connected' : 'Connect'}</UIButton>
            </AlertDescription>
          </Alert>
        }
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />}
      {!!liveLink && <Alert className="mb-8">
        <LucideFlame className="h-4 w-4" />
        <AlertTitle>
          <span>Your Bonjour is live</span>
        </AlertTitle>
        <AlertDescription className="flex justify-between items-center">
          <Link className="underline text-secondary-foreground" href={liveLink} target="_blank" rel="noopener noreferrer">{liveLink}</Link>
          <UIButton variant="outline" onClick={() => handleCopy(liveLink)}>Copy your Bonjour URL</UIButton>
        </AlertDescription>
      </Alert>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" disabled={hasRegister} {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. You can only change it once now.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your Profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <DialogUploader avatarUrl={avatarUrl} />
              </div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Socials</CardTitle>
              <CardDescription>Your Social Accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="x_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>X</FormLabel>
                    <FormControl>
                      <Input placeholder="X" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your X account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="Instagram" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Instagram account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github</FormLabel>
                    <FormControl>
                      <Input placeholder="Github" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Github account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="LinkedIn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your LinkedIn account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <UIButton type="submit" className="w-full" disabled={loading}>Submit{loading && <Loader2 className="w-4 h-4 animate-spin ml-2" />}</UIButton>
        </form>
      </Form>
    </Container>
  )
}
