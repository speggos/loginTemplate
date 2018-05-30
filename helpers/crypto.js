import bcrypt from 'bcryptjs';

// Returns a string in format: salt hash
export function hashPassword(password) {

    const salt = bcrypt.genSaltSync(16);

    return bcrypt.hashSync(password, salt);
}

export function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}