export const IIdentityProviderToken = Symbol('IIdentityProviderToken')

export interface IIdentityProvider {
  resolveHandle(handle: string): Promise<string>
}
