import { SocialPost } from '../model/social-post.model'

export const IFacebookApifyServiceToken = Symbol('IFacebookApifyServiceToken')

export interface IFacebookApifyService {
  getPost(url: string): Promise<SocialPost>
}
