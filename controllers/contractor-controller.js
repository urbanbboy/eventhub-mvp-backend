import ContractorService from "../services/contractor-service.js"


class ContractorController {
    async getContractorList(req, res, next) {
        try {
            const { category } = req.query
            const contractorList = await ContractorService.getContractorList(category)
            return res.json(contractorList)
        } catch (error) {
            next(error)
        }
    }

    async createContractor(req, res, next) {
        try {
            const { category, name, experienceThumb, rating, reviews, startPrice, description } = req.body
            const avatar = req.file ? req.file.path : ''
            const newContractor = await ContractorService.createContractor(category, name, experienceThumb, rating, reviews, startPrice, description, avatar)
            return res.json(newContractor)
        } catch (error) {
            next(error)
        }
    }
}

export default new ContractorController()