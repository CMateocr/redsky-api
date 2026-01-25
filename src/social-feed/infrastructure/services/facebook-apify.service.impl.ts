import { Injectable } from '@nestjs/common'
import { SocialPost } from '@social/domain/model/social-post.model'
import { IFacebookApifyService } from '@social/domain/services/facebook-apify.service'
import { FacebookApifyProvider } from '../providers/facebook-apify.provider'
import { FacebookApifyMapper } from '../mappers/facebook-apify.mapper'

@Injectable()
export class FacebookApifyService implements IFacebookApifyService {
  constructor(
    private readonly _facebookApifyProvider: FacebookApifyProvider,
    private readonly _facebookApifyMapper: FacebookApifyMapper,
  ) {}

  async getPost(url: string): Promise<SocialPost> {
    const actor = this._facebookApifyProvider.actorClient

    const client = this._facebookApifyProvider.client

    const input = {
      startUrls: [
        {
          url,
        },
      ],
      resultsLimit: 1,
      view: 'Detailed',
    }

    const run = await actor.call(input)

    const { items } = await client.dataset(run.defaultDatasetId).listItems()

    return this._facebookApifyMapper.toDomain(items[0], url)
  }
}
