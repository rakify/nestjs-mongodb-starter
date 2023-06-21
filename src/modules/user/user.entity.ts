import { Field, ObjectType } from '@nestjs/graphql';
import { ExtendedBaseEntity } from 'modules/common/common.entity';
import { Column, Entity } from 'typeorm';
import { UserAccessRole } from './user.interface';
import { Factory } from 'nestjs-seeder';
@ObjectType({ description: 'user entity' })
@Entity({ name: 'User' })
export class UserEntity extends ExtendedBaseEntity {
  @Factory((faker, ctx) =>
    ctx.firstName ? ctx.firstName : faker.name.firstName(),
  )
  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Factory((faker, ctx) =>
    ctx.lastName ? ctx.lastName : faker.name.lastName(),
  )
  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Factory((faker, ctx) => (ctx.email ? ctx.email : faker.internet.email()))
  @Field()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Factory(
    (faker, ctx) =>
      ctx.password
        ? ctx.password
        : '$2b$10$/3sioxoWNCCo3g/efr.cXuuXNvUWcPJM/PoBmKNVcHTaXtvgASF7C', //1234
  )
  @Field()
  @Column({
    name: 'password',
    type: 'text',
    comment: 'hashed password of the user',
    nullable: false,
  })
  password: string;

  @Factory((faker) => faker.image.avatar())
  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  avatarLink: string;

  @Factory((faker) => faker.image.cats())
  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  coverLink: string;

  @Field()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 10, nullable: true })
  country: string;

  @Field(() => UserAccessRole)
  @Column({
    type: 'enum',
    enum: UserAccessRole,
    default: UserAccessRole.Customer,
  })
  accessRole: UserAccessRole;
}
