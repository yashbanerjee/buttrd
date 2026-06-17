# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Website form email delivery

Contact, feedback, and catering forms submit to the local Express API at `/api/form-submissions`.
The API sends one email per submission through SMTP, so no hosted form service is required.

Configure these environment variables before running in production:

```bash
FORM_RECIPIENT_EMAIL=Info@buttrdme.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM_EMAIL=website@buttrdme.com
SMTP_FROM_NAME=Buttrd Website
```

`SMTP_FROM_EMAIL` should be an address authorized by the SMTP server. The customer email is used as the message `Reply-To`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
