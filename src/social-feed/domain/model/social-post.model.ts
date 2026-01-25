export interface SocialAuthor {
  displayName: string
  handle: string
  avatar: string
}

export interface SocialImage {
  url: string
  alt: string
}

export interface SocialMetrics {
  comments: number
  reposts: number
  likes: number
}

export class SocialPost {
  id: string

  text: string

  createdAt: Date

  images: SocialImage[]

  author: SocialAuthor
  metrics: SocialMetrics

  replies: SocialPost[]
}
