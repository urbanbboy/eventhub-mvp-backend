export default class UserDto {
    id;
    email;
    firstName;
    lastName;
    middleName;
    phone;
    role;
    image;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.middleName = model.middleName;
        this.phone = model.phone;
        this.role = model.role;
        this.image = model.image;

    }

}