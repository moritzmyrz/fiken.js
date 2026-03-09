import { Base } from '../base';
import { userinfo } from '../schemas';

export class User extends Base {
	getUser() {
		return this.requestRoot<userinfo>('user');
	}
}
