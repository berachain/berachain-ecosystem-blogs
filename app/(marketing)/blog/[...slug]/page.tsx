import { notFound } from "next/navigation"

import "@/styles/content.css"
import "@/styles/preflight.css"
import "@/styles/post.css"
import "@/styles/mdx.css"
import "@/styles/audio.css"
import "@/styles/blockquote.css"
import "@/styles/bookmark.css"
import "@/styles/button.css"
import "@/styles/callout.css"
import "@/styles/collection.css"
import "@/styles/file.css"
import "@/styles/gallery.css"
import "@/styles/header_v2.css"
import "@/styles/header.css"
import "@/styles/nft.css"
import "@/styles/product.css"
import "@/styles/signup.css"
import "@/styles/toggle.css"
import "@/styles/video.css"
import Image from "next/image"
import Link from "next/link"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { getSinglePost } from "@/app/api/getPosts"

import ReadMore from "../readMore"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getSinglePost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <div className="container flex max-w-6xl flex-col">
        <div className="items-start">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost" }), "px-0")}
          >
            <Icons.chevronLeft className="mr-2 h-6 w-6" />
            <div className="text-xl text-foreground">See all posts</div>
          </Link>
        </div>
        <div className="flex w-full items-center justify-center py-6 lg:py-10">
          <div className="items-center justify-center">
            {post.published_at && (
              <time
                dateTime={post.date}
                className="block text-sm text-muted-foreground"
              >
                Published on {formatDate(post.published_at)}
              </time>
            )}
            {post.title ? (
              <h1 className="my-2 inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                {post.title}
              </h1>
            ) : null}

            {post.authors?.length ? (
              <div className="mt-4 flex space-x-4">
                {post.authors.map((author) =>
                  author ? (
                    <div
                      key={author.id}
                      className="my-2 flex items-center space-x-2 text-sm"
                    >
                      {author?.profile_image ? (
                        <Image
                          src={author?.profile_image ?? "/avatar.png"}
                          alt={author?.name}
                          width={42}
                          height={42}
                          className="rounded-full bg-white"
                        />
                      ) : (
                        <Icons.user className="h-8 w-8 rounded-full bg-white" />
                      )}

                      <div className="flex-1 text-left leading-tight">
                        <div className="mb-0 text-[12px] font-medium">
                          {author.name}
                        </div>
                        <div className="text-[12px] text-muted-foreground">
                          {post.reading_time} min read
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            ) : null}

            {post.feature_image ? (
              <Image
                src={post.feature_image}
                alt={post.title}
                width={804}
                height={452}
                className="rounded-md border bg-muted transition-colors"
              />
            ) : null}

            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>
      </div>
      <ReadMore currentPostSlug={params.slug[0]} />
    </>
  )
}
