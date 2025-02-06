import ApiError from "../exceptions/api-error.js";
import CategoryModel from "../models/category-model.js";
import ContractorModel from "../models/contractor-model.js";

class ContractorService {
    async getContractorList(category) {
        let filter = {};

        if (category) {
            // Ищем категорию по slug
            const categoryDoc = await CategoryModel.findOne({ slug: category }).exec();

            if (!categoryDoc) {
                throw ApiError.NotFoundRequest("Категория не найдена");
            }

            // Фильтруем подрядчиков по _id найденной категории
            filter.category = categoryDoc._id;
        }

        const contractors = await ContractorModel.find(filter).exec();
        return contractors;
    }

    async createContractor(category, name, experienceThumb, rating, reviews, startPrice, description, avatar) {
        if(!category && !name) {
            throw ApiError.BadRequest("Остутствуют необходимые поля!")
        }

        const isExistContractor = await ContractorModel.findOne({ name })

        if(isExistContractor) {
            throw ApiError.BadRequest("Данное имя занято")
        }

        const newContractor = await ContractorModel.create({ category, name, experienceThumb, rating, reviews, startPrice, description, avatar })

        return newContractor
    }
}

export default new ContractorService();