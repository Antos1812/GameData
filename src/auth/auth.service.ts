import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async login(user: any){
        const payload = {username: user.username, sub: user.userId};
        return {
            acces_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, password: string): Promise<any> {
        const mockUser = {username: 'test', password: 'password', userId: 1};
        if(username === mockUser.username && password === mockUser.password){
            const {password, ...result } = mockUser;
            return result;
        }
        return null;
    }
}
