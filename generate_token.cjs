const crypto = require('crypto');

const secret = 'secret';
const header = { alg: 'HS256', typ: 'JWT' };
const payload = {
    sub: '33333333-3333-3333-3333-333333333333',
    tenant_id: '11111111-1111-1111-1111-111111111111',
    role_id: '22222222-2222-2222-2222-222222222222',
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) // 1 year
};

const base64UrlEncode = (obj) => {
    return Buffer.from(JSON.stringify(obj)).toString('base64')
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const encodedHeader = base64UrlEncode(header);
const encodedPayload = base64UrlEncode(payload);

const signatureInput = `${encodedHeader}.${encodedPayload}`;
const signature = crypto.createHmac('sha256', secret)
    .update(signatureInput)
    .digest('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

console.log(`${encodedHeader}.${encodedPayload}.${signature}`);
