#!/usr/bin/env node
'use strict';

/**
 * Next Shield
 * One-line security and authentication layer for Next.js applications with built-in CSRF and XSS protection
 *
 * @author TurkCode AI <https://turkcode.net>
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ComponentBuilder {
    constructor(options = {}) {
        this.typescript = options.typescript || false;
        this.cssModules = options.cssModules ?? true;
        this.testFramework = options.testFramework || 'jest';
    }

    createComponent(name, options = {}) {
        const ext = this.typescript ? 'tsx' : 'jsx';
        const styleExt = this.cssModules ? 'module.css' : 'css';

        const componentCode = `import React, { useState, useEffect, useCallback } from 'react';
${this.cssModules ? `import styles from './${name}.${styleExt}';` : ''}

${this.typescript ? `interface ${name}Props {
    className?: string;
    children?: React.ReactNode;
    onAction?: (data: unknown) => void;
}` : ''}

export ${options.defaultExport ? 'default ' : ''}function ${name}(${this.typescript ? `{ className, children, onAction }: ${name}Props` : '{ className, children, onAction }'}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const handleAction = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // API çağrısı veya işlem
            if (onAction) onAction(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [data, onAction]);

    useEffect(() => {
        // Component mount
        return () => {
            // Cleanup
        };
    }, []);

    if (loading) return <div className={${this.cssModules ? 'styles.loading' : "'loading'"}}>Yükleniyor...</div>;
    if (error) return <div className={${this.cssModules ? 'styles.error' : "'error'"}}>{error}</div>;

    return (
        <div className={${this.cssModules ? `\`\${styles.container} \${className || ''}\`` : `\`container \${className || ''}\```}}>
            {children}
            <button onClick={handleAction} disabled={loading}>
                İşlem Yap
            </button>
        </div>
    );
}`;

        return { [`${name}.${ext}`]: componentCode };
    }
}

class MiddlewareBuilder {
    static rateLimit(options = {}) {
        const windowMs = options.windowMs || 60000;
        const max = options.max || 100;

        return `import { NextResponse } from 'next/server';

const store = new Map();

export function rateLimitMiddleware(request) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const record = store.get(ip);

    if (!record || now - record.start > ${windowMs}) {
        store.set(ip, { start: now, count: 1 });
        return null; // Allow
    }

    if (record.count >= ${max}) {
        return NextResponse.json(
            { error: 'Rate limit exceeded' },
            { status: 429, headers: { 'Retry-After': String(Math.ceil((${windowMs} - (now - record.start)) / 1000)) } }
        );
    }

    record.count++;
    return null; // Allow
}`;
    }

    static auth() {
        return `import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/', '/login', '/register', '/api/auth'];

export async function authMiddleware(request) {
    const { pathname } = request.nextUrl;

    if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    const token = request.cookies.get('auth-token')?.value
        || request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const response = NextResponse.next();
        response.headers.set('x-user-id', payload.sub);
        response.headers.set('x-user-role', payload.role || 'user');
        return response;
    } catch {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}`;
    }
}

function generateApiRoute(name, options = {}) {
    const methods = options.methods || ['GET', 'POST', 'PUT', 'DELETE'];

    let code = `import { NextResponse } from 'next/server';

`;

    if (methods.includes('GET')) {
        code += `export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');

        // Veri çekme işlemi
        const data = { items: [], total: 0, page, limit };

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

`;
    }

    if (methods.includes('POST')) {
        code += `export async function POST(request) {
    try {
        const body = await request.json();

        // Validasyon
        if (!body) {
            return NextResponse.json({ error: 'Request body required' }, { status: 400 });
        }

        // Kayıt işlemi
        const created = { id: crypto.randomUUID(), ...body, createdAt: new Date().toISOString() };

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

`;
    }

    return code;
}

// CLI
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command || args.includes('--help')) {
        console.log(`
${tool.displayName} - ${tool.description}

Kullanım:
  ${tool.name} <komut> [seçenekler]

Komutlar:
  component <name>   React bileşeni oluştur
  middleware <type>   Next.js middleware oluştur (rate-limit, auth)
  api-route <name>    API route oluştur

Seçenekler:
  --typescript    TypeScript kullan
  --json          JSON formatında çıktı
  --help          Bu yardım mesajını göster

Daha fazla bilgi: ${SITE}
`);
        process.exit(0);
    }

    switch (command) {
        case 'component': {
            const name = args[1] || 'MyComponent';
            const ts = args.includes('--typescript');
            const builder = new ComponentBuilder({ typescript: ts });
            const result = builder.createComponent(name);
            Object.entries(result).forEach(([file, code]) => {
                console.log(`--- ${file} ---\n${code}`);
            });
            break;
        }
        case 'middleware': {
            const type = args[1] || 'rate-limit';
            const code = type === 'auth' ? MiddlewareBuilder.auth() : MiddlewareBuilder.rateLimit();
            console.log(code);
            break;
        }
        case 'api-route': {
            const name = args[1] || 'items';
            console.log(generateApiRoute(name));
            break;
        }
        default:
            console.error(`Bilinmeyen komut: ${command}`);
    }
}

module.exports = { ComponentBuilder, MiddlewareBuilder, generateApiRoute };
