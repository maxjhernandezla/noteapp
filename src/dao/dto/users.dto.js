export default class UserDto {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.id = user.id;
  }
}
