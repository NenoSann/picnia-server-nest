import { Test, TestingModule } from '@nestjs/testing';
import { ImageBucketService } from './image-bucket.service';

describe('ImageBucketService', () => {
  let service: ImageBucketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageBucketService],
    }).compile();

    service = module.get<ImageBucketService>(ImageBucketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
