import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('newtable')
export class TestEntity extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
  })
  id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string;
}
