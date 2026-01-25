import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { AppBskyFeedDefs, AppBskyFeedPost, AppBskyEmbedImages } from '@atproto/api'

import { SocialImage, SocialPost } from '@social/domain/model/social-post.model'

@Injectable()
export class BlueskyMapper {
  toDomain(raw: AppBskyFeedDefs.ThreadViewPost): SocialPost {
    const post = raw.post
    const rawRecord = post.record

    if (!AppBskyFeedPost.isRecord(rawRecord))
      throw new InternalServerErrorException('Post record is unreachable')

    const record = rawRecord as AppBskyFeedPost.Record

    return {
      id: post.uri,
      text: record.text,
      createdAt: new Date(record.createdAt),
      images: this.mapImages(post.embed),
      author: {
        displayName: post.author.displayName || post.author.handle,
        handle: post.author.handle,
        avatar: post.author.avatar || '',
      },
      metrics: {
        likes: post.likeCount || 0,
        reposts: post.repostCount || 0,
        comments: post.replyCount || 0,
      },
      replies: this.mapReplies(raw.replies),
    }
  }

  private mapReplies(rawReplies: unknown[] | undefined): SocialPost[] {
    if (!Array.isArray(rawReplies)) return []

    return rawReplies
      .filter((reply) => {
        return AppBskyFeedDefs.isThreadViewPost(reply)
      })
      .map((reply) => {
        return this.toDomain(reply as AppBskyFeedDefs.ThreadViewPost)
      })
  }

  private mapImages(embed: unknown): SocialImage[] {
    if (AppBskyEmbedImages.isView(embed)) {
      const view = embed as AppBskyEmbedImages.View

      return view.images.map((viewImage) => ({
        url: viewImage.fullsize,
        alt: viewImage.alt,
      }))
    }

    return []
  }
}
