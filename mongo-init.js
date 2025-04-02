print('开始数据库初始化...');

db.auth('root', 'example');

db = db.getSiblingDB('picnia-database-test');

try {
  db.createUser({
    user: 'root',
    pwd: 'example',
    roles: [
      {
        role: 'readWrite',
        db: 'picnia-database-test'
      }
    ]
  });
  print('用户创建成功');
} catch (error) {
  print('创建用户时出错：' + error);
}

// 创建测试集合以确保数据库存在
db.createCollection('test');
print('数据库初始化完成');