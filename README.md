# Set Up

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
