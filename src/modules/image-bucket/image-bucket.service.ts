import { Injectable } from '@nestjs/common';
import COS from 'cos-nodejs-sdk-v5';
import { StoreAvatarDto } from './dto';
const SecretKey = process.env['SecretKeyPicnia']
const SecretId = process.env['SecretIdPicnia']
const baseKey = process.env['BaseKey']
const Bucket = process.env['Bucket']
const Region = process.env['Region']

@Injectable()
export class ImageBucketService {
  cos: COS
  constructor() {
    this.cos = new COS({
      SecretId,
      SecretKey,
    })
  }

  async storeImage(imageBuffer: Buffer, key: string) {
    return new Promise((resolve, reject) => {
      try {
        this.cos.putObject({
          Bucket,
          Region,
          Key: `${baseKey}/${key}`,
          Body: imageBuffer,
        }, (_err, data) => {
          resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async storeMultipleImage(imageBuffers: Buffer[], keys: string[]) {
    return new Promise((resolve, reject) => {
      try {
        const promises = keys.map((key, index) => {
          return new Promise((res, rej) => {
            this.cos.putObject({
              Bucket,
              Region,
              Key: `${baseKey}/${key}`,
              Body: imageBuffers[index],
            }, (_err, data) => {
              res(data)
            })
          })
        })
        Promise.all(promises).then((data) => {
          resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async storeAvatar(storeAvatarDto: StoreAvatarDto) {
    const { userId, version, imgType } = storeAvatarDto
    return new Promise((resolve, reject) => {
      try {
        this.cos.putObject({
          Bucket,
          Region,
          Key: `${baseKey}/avatar/${userId}/${version}.${imgType}`,
          StorageClass: 'STANDARD',
          Body: storeAvatarDto.avatarData,
        }).then((response) => resolve(response))
      } catch (error) {
        reject(error)
      }
    })
  }
}
