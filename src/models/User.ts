import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import serialize from '../helpers/serializers';

/**
 * Helper interface
 */
interface UserInterface {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

/**
 * Main authentication object
 */
@Entity()
export default class User extends BaseEntity {
    constructor(user: UserInterface) {
        super();
        if (user) {
            this.email = user.email;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.setPasswords(user.password);
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: false })
    password: string;

    /**
     * Hash password and store on the user. This function will not commit the changes
     * @param password raw password entered by the user
     */
    setPasswords = (password: string) => {
        this.password = bcrypt.hashSync(password, 10);
    };

    /**
     * Compare password to the hash on the model
     * @param password raw password entered by the user
     */
    validatePassword = (password: string) => {
        return bcrypt.compareSync(password, this.password);
    };

    generateJWT = () => {
        const today = new Date();
        const expirationDate = new Date(today);

        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign(
            {
                _id: this.id,
                email: this.email,
                exp: expirationDate.getTime() / 1000,
            },
            'secret'
        );
    };

    toJSON = () => {
        return serialize(this, [
            'id',
            'email',
            'firstName',
            'lastName',
            ['generateJWT', 'jwt'],
        ]);
    };
}
