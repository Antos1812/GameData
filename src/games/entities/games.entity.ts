import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Games {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    playtime: number;
    @Column()
    playersnumber: number;
    @Column()
    description: string;
}