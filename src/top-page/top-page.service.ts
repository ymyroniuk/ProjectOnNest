import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}
    async create(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto);
    }
    async getById(id: string) {
        return this.topPageModel.findById(id).exec();
    }
    async getByAlias(alias: string) {
        return this.topPageModel.findOne({ alias }).exec();
    }
    async getAll() {
        return this.topPageModel.find({}).exec();
    }
    async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec();
    }
    async updateById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    async findByCategory(firstCategory: TopLevelCategory) {
        return this.topPageModel.aggregate()
        .match({ firstCategory })
        .group({
            _id: { secondCategory: '$secondCategory' },
            pages: { $push: {alias: '$alias', title: '$title'} }
        }).exec();
    }
    async getByText(text: string) {
        return this.topPageModel.find({$text: { $search: text, $caseSensitive: false } }).exec();
    }
}
