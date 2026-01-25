import { Body, Controller, Get, Query } from '@nestjs/common'
import { BlueskyUsecase } from '@social/application/bluesky.use-case'
import { FacebookApifyUsecase } from '@social/application/facebook-apify.use-case'
import { GetPostDto } from '@social/shared/dtos/get-post.dto'

@Controller('social')
export class SocialController {
  constructor(
    private readonly _blueskyUsecase: BlueskyUsecase,
    private readonly _facebookApifyUsecase: FacebookApifyUsecase,
  ) {}

  @Get('bluesky')
  getPostFromBlueSky(@Query() getPostDto: GetPostDto): Promise<unknown> {
    return this._blueskyUsecase.getPostByUrl(getPostDto)
  }

  @Get('facebook')
  getPostFromFacebook(@Query() getPostDto: GetPostDto): Promise<unknown> {
    return this._facebookApifyUsecase.getPostByUrl(getPostDto.url)
  }
}
