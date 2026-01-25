import { Inject, Injectable } from '@nestjs/common'
import {
  IFacebookApifyServiceToken,
  type IFacebookApifyService,
} from '@social/domain/services/facebook-apify.service'

@Injectable()
export class FacebookApifyUsecase {
  constructor(
    @Inject(IFacebookApifyServiceToken)
    private readonly _facebookApifyService: IFacebookApifyService,
  ) {}

  async getPostByUrl(url: string): Promise<unknown> {
    return this._facebookApifyService.getPost(url)
  }
}
