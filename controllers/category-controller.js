import CategoryService from '../services/category-service.js';

class CategoryController {
    async getCategoryList(req, res, next) {
        try {
            const categoryList = await CategoryService.getCategoryList();
            return res.json(categoryList);
        } catch (error) {
            next(error);
        }
    }

    async createCategory(req, res, next) {
        try {
            const { name, slug } = req.body;
            const image = req.file ? req.file.path : ''
            const newCategory = await CategoryService.createCategory(name, slug, image);

            return res.json(newCategory);
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();
