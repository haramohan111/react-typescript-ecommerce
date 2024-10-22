// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
import { sign } from 'jsonwebtoken';

export function generateAccessToken(id: string): string {
    const token = sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, {
        algorithm: 'HS256',
        expiresIn: '60s'
    });
    return token;
}

export function generateRefreshToken(id: string): string {
    const token = sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, {
        algorithm: 'HS256',
        expiresIn: '1d'
    });
    return token;
}


//export default generateToken