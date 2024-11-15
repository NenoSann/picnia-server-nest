import { Test, TestingModule } from '@nestjs/testing';
import { Mongod } from './mongod';

describe('Mongod', () => {
  let provider: Mongod;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mongod],
    }).compile();

    provider = module.get<Mongod>(Mongod);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
