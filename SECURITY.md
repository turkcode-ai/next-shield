# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of **Next Shield** seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **Do NOT** open a public GitHub issue for security vulnerabilities
2. Email us at **security@turkcode.net** with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 5 business days
- **Resolution:** Depends on severity
  - Critical: 24-72 hours
  - High: 1 week
  - Medium: 2 weeks
  - Low: Next release cycle

### Disclosure Policy

- We follow responsible disclosure practices
- Security patches will be released as soon as possible
- Credit will be given to reporters (unless anonymity is requested)
- We will coordinate disclosure timing with the reporter

## Security Best Practices

When using `next-shield` in production:

- Keep the package updated to the latest version
- Use environment variables for sensitive configuration
- Never commit API keys, tokens, or credentials
- Enable rate limiting for API endpoints
- Use HTTPS for all external communications
- Review dependencies regularly with `npm audit`

## Dependencies

We regularly audit our dependencies for known vulnerabilities using:
- `npm audit`
- GitHub Dependabot alerts
- Snyk vulnerability database

## Contact

- Security issues: security@turkcode.net
- General inquiries: info@turkcode.net
- Website: [TurkCode AI](https://turkcode.net)
