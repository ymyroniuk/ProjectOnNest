import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService
    ) {}
    async createUser(dto: AuthDto): Promise<DocumentType<UserModel>> {
        const hashPassword = await hash(dto.password, 13);
        const newUser = new this.userModel({
            email: dto.email,
            password: hashPassword
        });
        return newUser.save();
    }
    async findUser(email: string): Promise<DocumentType<UserModel> | null> {
        return this.userModel.findOne({ email }).exec();
    }
    async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
        const user = await this.findUser(email);
        if(!user) {
            throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
        }
        const isCorrectPassword = await compare(password, user.password);
        if(!isCorrectPassword) {
            throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
        }
        return { email: user.email };
    }
    async login(email: string) {
        const payload = { email };
        return { accessToken: await this.jwtService.signAsync(payload) };
    }
}
