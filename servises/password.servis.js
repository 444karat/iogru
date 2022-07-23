const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
        // Throw new Error('Ошибка хеширования', err);
    }
}

async function checkPassword(password, hash) {
    return bcrypt.compare(password, hash).then(res => res);
}

module.exports = {hashPassword, checkPassword};