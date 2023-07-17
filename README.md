This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Product Ordering App with Next.js 13.1.5 and MongoDB

## Introduction

This app is part of my learning process of fullstack web app built using Next.js framework.
I use Chakra UI for quick UI style. My focus for building the app learn about React.js, Typescript, other Backend side and some architecture such as Test Driven Development (TDD) and Event-Driven Architecture.

[Live Demo](https://pc-orders.vercel.app/)

## Known Issue

I can not figure how to mock `dbConnect` function from `src/mongodb/`, so before run the test, need to comment all `dbConnect` calls from API files.

## App Idea

- User side

User can view products

Add the product to cart (cart is persist whether the user is logged in or not)

Make a payment and then can views the orders process

- Admin side

Admin can do CRUD on product item 

Process/update the orders status based on it's progress for customer to see 

## PayPal Sandbox Test Account

Use account below to complete the checkout process.

Email: `sb-vehci25201690@personal.example.com`

Password: `&vH.n)0)`

## Tech Use

- [Next.js](https://nextjs.org/)
- TypeScript
- [Chakra UI](https://chakra-ui.com/)
- [Jest](https://jestjs.io/)
- [NextAuth](https://next-auth.js.org/)
- [MongoDB](https://www.mongodb.org/)
- [SWR](https://swr.vercel.app/)

## Learn Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
