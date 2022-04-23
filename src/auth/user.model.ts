import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
    @prop({ unique: true, required: true })
    email: string;
    
    @prop({ required: true })
    password: string;
}
