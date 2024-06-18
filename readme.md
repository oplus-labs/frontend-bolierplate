[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Getting Started with the Starter Kit

## Preparing Your Environment

Before you start working with this kit, it's essential to clean up any unnecessary files and folders:

1. Remove unused routes in `appRoutes.ts`.
2. Delete unnecessary pages in the `pages` folder.
3. Clean up the `HomePageTemplate.tsx` file as required.

## Quick Start Guide

1. Use Yarn for package installation. If you inadvertently use `npm install`, make sure to delete the `yarn.lock` file, and then proceed with the installation using npm.

2. Create a `.env` file and duplicate it from `.env.sample`.

3. Start the development server by running `yarn dev`.

4. If you encounter an error on the "/dashboard" route, consider commenting out the proxy setup part in the `vite.config.ts` file.

<!-- <!-- ## Folder Structure

- [API](./src/api/readme.md) - API documentation for the project.

- [Wrappers](./src/api/wrappers/readme.md) - Wrappers.

- [Routes](./src/routes/readme.md) - Documentation for routes.

- [Utils](./src/utils/readme.md)

- [UI](./src/ui/readme.md)

  - [Atoms](./src/ui/atoms/readme.md) - Pure HTML components and primitives.

  - [Molecules](./src/ui/molecules/readme.md) - Group of Atoms.

  - [Organisms](./src/ui/organisms/readme.md) - Group of Molecules.

  - [Templates](./src/ui/templates/readme.md) - Group of Organisms.

  - [Pages](./src/ui/pages/readme.md) - Group of Templates.

  - [CustomComponents](./src/ui/customComponents/readme.md) - Custom Components. 

## Example: Adding a shadcn component (select component - [link](https://ui.shadcn.com/docs/components/select))

To add the `select` component, run the following command:

```bash
npx shadcn-ui add select
```
Specify the path as `./src/ui/atoms/common/.`

Make sure to:
* Resolve all classes with tailwind prefix.
* Replace classes with color variables with project-specific color variables.
* Add any missing dependencies if npx fails to install them automatically, e.g., @radix-ui/react-select. --> 

### Husky Disabled Warning
If you encounter a Husky disabled warning on your device, please run the following two commands in your terminal:


```bash
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```