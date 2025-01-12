import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Games {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    name: string;

    @Column({nullable: false})
    playtime: number;

    @Column({nullable: false})
    playersnumber: number;

    @Column({nullable: false})
    description: string;
}