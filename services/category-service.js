import ApiError from '../exceptions/api-error.js'
import CategoryModel from '../models/category-model.js'

class CategoryService {
    async getCategoryList() {
        const categoryList = await CategoryModel.find()

        return categoryList;
    }

    async createCategory(name, slug, image) {
        const isExistTitle = await CategoryModel.findOne({ name })

        if(isExistTitle) {
            throw ApiError.BadRequest("Такая категория уже существует!")
        }

        const newCategory = await CategoryModel.create({ name, slug, image })
        return newCategory
    }
}

export default new CategoryService()