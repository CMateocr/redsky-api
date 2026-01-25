import { Injectable } from '@nestjs/common'
import { SocialPost } from '@social/domain/model/social-post.model'

@Injectable()
export class FacebookApifyMapper {
  toDomain(apifyItem: any, originalUrl: string): SocialPost {
    const authorName = apifyItem.user?.name || apifyItem.pageName || 'Facebook User'
    const authorHandle = apifyItem.user?.id || apifyItem.pageName || 'unknown'
    const authorAvatar = apifyItem.user?.profilePic || ''

    const images = (apifyItem.media || [])
      .map((mediaItem: any) => ({
        url: mediaItem.photo_image?.uri || mediaItem.url || mediaItem.thumbnail,
        alt: mediaItem.ocrText || 'Facebook Image',
      }))
      .filter((img: any) => !!img.url)

    const likes = apifyItem.likes ?? apifyItem.reactionLikeCount ?? 0
    const comments = apifyItem.comments ?? 0
    const shares = apifyItem.shares ?? 0

    return {
      id: apifyItem.postId || originalUrl,

      text: apifyItem.text || '',

      createdAt: apifyItem.time ? new Date(apifyItem.time) : new Date(),

      images: images,

      author: {
        displayName: authorName,
        handle: authorHandle,
        avatar: authorAvatar,
      },

      metrics: {
        likes: Number(likes),
        reposts: Number(shares),
        comments: Number(comments),
      },

      replies: [],
    }
  }
}
