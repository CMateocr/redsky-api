import { Injectable, NotFoundException } from '@nestjs/common'

import { AppBskyFeedDefs } from '@atproto/api'

import { IBlueskyService } from '@social/domain/services/bluesky.service'
import { SocialPost } from '@social/domain/model/social-post.model'

import { BlueskyProvider } from '../providers/bluesky.provider'
import { BlueskyMapper } from '../mappers/bluesky.mapper'

@Injectable()
export class BlueskyService implements IBlueskyService {
  constructor(
    private readonly _blueskyProvider: BlueskyProvider,
    private readonly _blueskyMapper: BlueskyMapper,
  ) {}

  getPosts(uri: string[]): Promise<unknown> {
    throw new Error('Method not implemented.')
  }

  async getPost(uri: string): Promise<SocialPost> {
    const agent = this._blueskyProvider.blskAgent

    const response = await agent.getPostThread({
      uri,
      depth: 1,
      parentHeight: 0,
    })

    if (!AppBskyFeedDefs.isThreadViewPost(response.data.thread))
      throw new NotFoundException("Post has been deleted or doesn't exists")

    return this._blueskyMapper.toDomain(response.data.thread)
  }
}
