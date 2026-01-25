import { BadRequestException } from '@nestjs/common'

export const parseBlueskyUrl = (url: string): { handle: string; rkey: string } => {
  try {
    const urlObj = new URL(url)
    const parts = urlObj.pathname.split('/')

    const handle = parts[2]
    const rkey = parts[4]

    if (!handle || !rkey) throw new Error()

    return { handle, rkey }
  } catch (e) {
    throw new BadRequestException('Invalid bluesky url')
  }
}
