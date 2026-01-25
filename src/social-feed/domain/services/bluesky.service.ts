import { SocialPost } from '../model/social-post.model'

export const IBlueskyServiceToken = Symbol('IBlueskyServiceToken')

export interface IBlueskyService {
  getPosts(uri: string[]): Promise<unknown>
  getPost(uri: string): Promise<SocialPost>
}
