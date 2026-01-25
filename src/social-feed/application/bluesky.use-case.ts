import { Inject, Injectable } from '@nestjs/common'
import { SocialPost } from '@social/domain/model/social-post.model'
import {
  type IBlueskyService,
  IBlueskyServiceToken,
} from '@social/domain/services/bluesky.service'
import {
  type IIdentityProvider,
  IIdentityProviderToken,
} from '@social/domain/services/identity.provider'
import { parseBlueskyUrl } from '@social/shared/utils/parse-bluesky.util'
import { GetPostDto } from '../shared/dtos/get-post.dto'

@Injectable()
export class BlueskyUsecase {
  constructor(
    @Inject(IBlueskyServiceToken)
    private readonly _blueskyService: IBlueskyService,
    @Inject(IIdentityProviderToken)
    private readonly _identityProvider: IIdentityProvider,
  ) {}

  async getPostByUrl(getPostDto: GetPostDto): Promise<SocialPost> {
    const { url, limit } = getPostDto

    const { handle, rkey } = parseBlueskyUrl(url)

    const did = await this._identityProvider.resolveHandle(handle)

    const uri = `at://${did}/app.bsky.feed.post/${rkey}`

    const postThread = await this._blueskyService.getPost(uri)

    return { ...postThread, replies: postThread.replies.slice(0, limit) }
  }
}
