import UserModel from '../models/user-model.js'
import bcrypt from 'bcrypt'
// import MailService from '../services/mail-service.js'
import TokenService from './token-service.js'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'
class UserService {
    async register(email, password, phone, name, role, acceptTerms, getSMS) {
        const candidateEmail = await UserModel.findOne({ email })

        if(acceptTerms == false) {
            throw ApiError.BadRequest("Примите соглашение с Условиями использования и Политикой конфиденциальности")
        }

        if(candidateEmail) {
            throw ApiError.BadRequest("Пользователь с такой почтой уже существует")
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 3)
        const splittedName = name.split(' ')

        const user = await UserModel.create({ 
            email, 
            role, 
            phone,
            firstName: splittedName[1],
            lastName: splittedName[0],
            middleName: splittedName[2],
            password: hashedPassword, 
        })
        // await MailService.sendActivationMail(email, `${process.env.API_RENDER_URL}/api/activate/${activationLink}`)
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
            access: "allow",
        }
    }

    // async activate(activationLink) {
    //     const user = await UserModel.findOne({ activationLink })
    //     if(!user) {
    //         throw ApiError.BadRequest("Некорректная ссылка активации")
    //     }

    //     user.isActivated = true
    //     user.activationLink = null
    //     await user.save()
    // }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if(!user) {
            throw ApiError.BadRequest("Пользователь не найден")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            throw ApiError.BadRequest("Неверный пароль")
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto, access: "allow"}
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)

        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken)
    
        return {...tokens, user: userDto, access: 'allow'}
    }

    async updateUser(id, username, email, image) {
        const user = await UserModel.findById(id)
        if(!user) {
            throw ApiError.BadRequest("Пользователь не найден")
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                username, email, image
            },
            { new: true }
        )

        const userDto = new UserDto(updatedUser)
        return {...userDto};
    }
}

export default new UserService()