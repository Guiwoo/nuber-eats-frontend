# Set Up

- ## Style Mobile First Allllwayyyyyyss

- ## Apollo Codegen
  - npm run apollo:codegen "for delete previous folder"
  - run on terminal not script
  - apollo client:codegen src/**generated** --target=typescript --outputFlat
- ## Tailinwd

  - [Check Here for Detail](https://tailwindcss.com/docs/guides/create-react-app)
  - npx create-react-app "name" --template-typescript
  - npm i tailwindcss postcss autoprefixer
  - npx tailwindcss init
  - Make input and output set up package.json
    - "tailwind:build" : "npx tailwindcss-cli build -i ./src/styles/tailwind.css -o ./src/styles/styles.css",

- ## Apollo Setup

  - [Check Here✅](https://www.apollographql.com/docs/react/get-started/)
  - npm install @apollo/client graphql

- ## Router
  - [Check Here for Detail](https://v5.reactrouter.com/web/guides/quick-start)
  - yarn add react-router-dom
  - Considering 2Routers
    - App
      - Logged In
        - blarblar
      - Logged out

# Authentication

- ## Local Only Fields

  - [Click Here For Detail](https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/)
  - Fields that aren't defined in GraphQL Schema "Apollo can handle local state"
  - It's state is not in your sever but hope staying in your application.abs

    - Examples ) "User logged in or not","Dark Mode or Light Mode"

  - If can't change the value ? It's kinda useless
  - Reactive varibales [Click Here For Detail](https://www.apollographql.com/docs/react/local-state/reactive-variables/)
    - read and modify anywhere without graphql operation to do and stores in apollo
    - every single change the variables the active query will automatically refreshes
      - const isLoggedIn = useReactiveVar(isLoggedInVar); easyyy to get state

- ## React Hook Form

  - [Click Here For Detail](https://react-hook-form.com/ts)

- ## React Router Dom

  - [Click Here For Detail](https://reactrouter.com/docs/en/v6)

- ## Login Page

  - Tailwind Styling
    - Mobile Design First !!!!!!
    - Can extend colors on tailwind.config.js !
    - [Check Here](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors)
    - How to tacking formState ? for if filled in ? shows diffenrt color !
    - thing

- Use React Hook Form
- Calling mutation

  - our mutation was not protected
  - npm install -g apollo apollo
  - Apollo Codegen will help types
    - 1. Downgrade node version
    - 2. Downgrade graphql version @15.5.1
    - 3. run code on terminal not on script !

- after pass the user save the token on localstorage and apollo var

- ## Create Page

  - ReactHelmetAsync for change the title on the top bar
  - Email regex [Check Here](https://emailregex.com/)
  - after Create account sucess ? send user to login page
    - with data

- ## Token

  - Not working why ? our requesting does not contain header !
  - [Check Here](https://www.apollographql.com/docs/react/networking/authentication/)

- ## Header
  - Container "tailwind magic with w-full , max-w-screen-lg"
  - If you wanna use data something don't need to drill down upder component
    - Have a "Cache" system

# User Pages

- ## Verifying Email

  - [Get Query Awesome way](https://reactrouter.com/web/example/query-parameters)
  - email to verifying email will send to 127.0.0.1 !== localchost
    - need to fix it (when deploy)
  - Handling Cache No need to refetch or get mutation
    - [Check Here](https://www.apollographql.com/docs/react/caching/cache-interaction/)
    - [Check Here](https://www.apollographql.com/docs/react/caching/cache-interaction/#writefragment)
    - awesome and super fast

- ## Edit Profile
  - same as verifying email
  - Chache or Refeching
    - Those work same way (diffency is Speed !)
    - [Refech check here](https://www.apollographql.com/docs/react/data/queries/#refetching)
