import Image, { type ImageProps } from 'next/image'
// @ts-ignore
import { type MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
  }
}
