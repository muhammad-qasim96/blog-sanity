import { groq } from "next-sanity";
import Image from "next/image";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "../../../../components/RichTextComponents";

interface PostProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60; // revalidate every 60 seconds

export async function generateStaticParams() {
  const query = groq`
        *[_type == "post"] {
            slug,
        }`;

  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug,
  }));
}

const Post = async ({ params: { slug } }: PostProps) => {
  const query = groq`
        *[_type == "post" && slug.current == $slug][0] {
            ...,
            author->,
            categories[]->,
        }
    `;

  const post: Post = await client.fetch(query, { slug });

  return (
    <article className="px-10 pb-28 ">
      <section className="space-y-2 border border-[#f7ab0a] text-white">
        <div className="relative flex flex-col justify-between md:flex-row">
          <div className="absolute top-0 h-full w-full p-10 opacity-10 blur-sm">
            <Image
              className="mx-auto object-cover object-center"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>

          <section className="w-full bg-[#f7ab0a] p-5">
            <div className="flex flex-col justify-between gap-y-5 md:flex-row">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                />

                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <div>
                    {/* 
                    // TODO: Author bio  
                  */}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="pt-10 italic">{post.description}</h2>
              <div className="mt-auto flex items-center justify-end space-x-2">
                {post.categories.map((category) => (
                  <p
                    key={category._id}
                    className="mt-4 rounded-full bg-gray-800 px-3 py-1 text-sm font-semibold text-white"
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
};

export default Post;
