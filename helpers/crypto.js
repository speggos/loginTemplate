//import bcrypt from 'bcryptjs'; For improved security;
import passwordHash from 'password-hash';


// Returns a string in format: salt hash
export function hashPassword(password) {

    return passwordHash.generate(password);
}

export function checkPassword(password, hash) {
    return passwordHash.verify(password, hash);
}