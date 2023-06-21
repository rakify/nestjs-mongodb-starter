import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
  Column,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { constant } from 'core/default';

@ObjectType()
export abstract class ExtendedBaseEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ type: 'varchar', length: 36, default: constant.DEFAULT_USER })
  createdBy: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ type: 'varchar', length: 36, default: constant.DEFAULT_USER })
  updatedBy: string;
}
