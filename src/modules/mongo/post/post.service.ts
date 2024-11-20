import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { Model } from 'mongoose';
import { IPost } from './post.dto';
import { IUser } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { createPostDto, queryUserPostsDto as queryUserPostsByTypeDto } from './dto';
import { ImageBucketService } from '@/modules/image-bucket/image-bucket.service';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_MODEL')
    private readonly postModel: Model<IPost>,
    @Inject('USER_MODEL')
    private readonly userModel: Model<IUser>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => ImageBucketService))
    private readonly imageBucketService: ImageBucketService
  ) { }

  async createPost(Post: createPostDto): Promise<string> {
    const { imageBuffer, author, localtion, date, content, orientation, comments, imageType } = Post
    try {
      const user = await this.userModel.findOne({ userName: author })
      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      }
      const newPost = new this.postModel({
        author: user._id,
        localtion,
        date,
        content,
        comments: comments || [],
        orientation
      })
      const imageURL = await this.imageBucketService.storePostImage(imageBuffer, newPost._id as string, imageType)
      newPost.image = `https://${imageURL.Location}`
      user.posts.push(newPost._id as string)
      await user.save()
      return newPost._id as string
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async queryUserPostsByType(param: queryUserPostsByTypeDto) {
    const { type, requestUserId } = param
    try {
      const targetUser = await this.userModel.findById(requestUserId)
      if (!targetUser) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      }
      const targetList = this.userService.getUserPostList(type, targetUser)
      const uploaderInfo = this.userService.getUploaderData(targetUser)
      const postArray = []
      for (const postId of targetList) {
        const post = await this.postModel.findById(postId)
        if (post) {
          postArray.push(this.getFullPostData(post, targetUser))
        }
      }
      return postArray
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async randomQuery(count: number, requestUserName: string) {
    try {
      const targetUser = await this.userModel.findOne({ userName: requestUserName })
      if (!targetUser) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
      }
      const postArray = []
      const postList = await this.postModel.aggregate([{ $sample: { size: count } }])
      for (const post of postList) {
        postArray.push(this.getFullPostData(post, targetUser))
      }
      return postArray
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deletePostById(postId: string) {
    try {
      const post = await this.postModel.findById(postId)
      if (!post) {
        throw new HttpException('post not found', HttpStatus.NOT_FOUND)
      }
      const author = await this.userModel.findById(post.author)
      await post.deleteOne()
      author.posts = author.posts.filter((id) => id !== postId)
      await author.save()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  getPostData(post: IPost) {
    const { location, date, content, likes, saves, comments, image, _id } = post
    return {
      location: location,
      postTime: date,
      postContent: content,
      likes: likes,
      saves: saves,
      commenents: comments,
      commentCounts: comments.length,
      postImage: image,
      postID: _id,
    }
  }

  getFullPostData(post: IPost, user: IUser) {
    return {
      uploader: this.userService.getUploaderData(user),
      post: this.getPostData(post),
      isLike: user.likeList.includes(post._id as string),
      isSaved: user.saveList.includes(post._id as string)
    }
  }
}
