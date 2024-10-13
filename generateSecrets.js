import { randomBytes } from 'crypto';

const accessSecret = randomBytes(32).toString('hex');
const refreshSecret = randomBytes(32).toString('hex');

console.log('JWT_ACCESS_SECRET:', accessSecret);
console.log('JWT_REFRESH_SECRET:', refreshSecret);