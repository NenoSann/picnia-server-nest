export interface StoreAvatarDto {
  readonly avatarData: Buffer,
  readonly userId: string,
  readonly version: number,
  readonly imgType: string
}