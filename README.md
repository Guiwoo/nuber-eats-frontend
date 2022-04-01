# What need to do more

- [] Search Page

- [] UnitTesting the Pages

- [] before confirm the order show the list for order item and total price

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

# Restaurant

- Search
  - Lazy Query for not running immidetley

# Testing

- Focusing the output not a implemetation
- setting the jest
- "jest":{
  "collectCoverageFrom": [
  "./src/components/**/*.tsx",
  "./src/pages/**/*.tsx",
  "./src/routers/**/*.tsx"
  ]
  }

- Check the script to coverage

  - "test:cov" : "npm test -- --coverage --watchAll=false"

- ## Component Testing

  - ### App Testing

    - mocking each Components
    - testing by screen.getText "expected user output"

  - ### Btn Testing

    - Not care about ternary opertation
    - expected with to have Class "" testing !!

  - ### RestaurantList

    - props just make a object for props and use seperate operations
    - screen.getByRole("things)

  - ### Header

    - getByText, queryByText return different, fail and null
    - mocking Query me
      - Using MockedProvider apollo offering
      -
      ```
      mocks={[
        {
        request: {
        query: ME_QUERY,
        },
        result: {
        data: {
        me: {
        id: 1,
        email: "",
        role: "",
        verified: true,
        },
        },
        },
        },
        ]}
      ```
      - can give a mock value exactly same on query

  - ### Pagination

    - Mocking state like this
    - const my = 2;
    - const setPage = jest.fn();
    - React.useState = jest.fn().mockReturnValue([my, setPage]);

  - ### CategoryList
    - Nothing special use varialbes and get text the test name

- ## Page Testing

  - ### Login

    - Need to testing variables of mutations but apollo mockprovider can't test like that, It's not giving enough detail contorll for unit testing
    - Use [Mock Apollo Client](https://github.com/mike-gibson/mock-apollo-client)
    - Login input "userEvent type, clear click ,etc.. make real events"
    - Don't forget it's not going to db

  - ### Create
    - Test Utils [Check here](https://testing-library.com/docs/react-native-testing-library/setup/#custom-render)
    - Jest.requireActual(moudlename) "return real modues" [Clickhttps://jestjs.io/docs/jest-object#jestrequireactualmodulename)
    - jest.clearAllMocks() all mocks with calls, instans delete all attributes
      [Check Here](https://jestjs.io/docs/jest-object#jestclearallmocks)

- ## E2E Testing

  - ### Cpypress

    - Can E2E test on mac windows Linux

    - Download Cypress

      - need to configure ts in cypress
      - Can cofigure setting on sypress.json

    - Download cypress testing libaray

      - For helping get a elements
      - When you using testing library for getting elements , need to break down chain a bit

    - window() get a object from active webpage
    - its() The objects porperties from have got before
    - [Command Cypress Check Here](https://docs.cypress.io/api/commands/its)
    - cy.wait("Can user wait time")[Command Check here](https://docs.cypress.io/api/commands/wait)
    - ### Intercept

      - Spy or Mock the request and response [Site](https://docs.cypress.io/api/commands/intercept)
      - Ending the response with res.send()
        - Response steps immediately finished, and can't call anyother response handler
      - [Dynamically Stubbing a response](https://docs.cypress.io/api/commands/intercept#Dynamically-stubbing-a-response)
      - [Controlling the response](https://docs.cypress.io/api/commands/intercept#Controlling-the-response)

      - ### Create On Command

        - [Command Docs](https://docs.cypress.io/api/cypress-api/custom-commands)
        - Cypress Can make a command or override command

      - ### Before Each

        - beforeEach()
        - use this hook it will fire before each testing super useful
          - [Docs](https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Aliases-are-reset-before-each-test)

      - ### Aliasing individual requests
        - [Docs](https://docs.cypress.io/api/commands/intercept#Aliasing-individual-requests)
        - Intercepting a response
          - [Docs](https://docs.cypress.io/api/commands/intercept#Intercepting-a-response)
        - Fixture (the data which is preset data)
          - [Docs](https://docs.cypress.io/api/commands/intercept#Stubbing-a-response)
        - Using fixture to send by res.send()
          - [Docs](https://docs.cypress.io/api/commands/intercept#Ending-the-response-with-res-send)

# Owner Dash Board

- Restaurants
- Restaurant

  - Shows the dishes
  - Graph for monthly sales,dayly or year

    - [Victory](https://formidable.com/open-source/victory/)
    - [PieChart](https://formidable.com/open-source/victory/docs/victory-pie)

    - Victory Container
      - Kinda Parents Component !!(It will helps to inner victory rendering)
      - Basic of Dynamic Svg rederning
      - Service of Portal Container as well

- Dish
  - menu
    - Can make a dynamic field with react-hook-form
    - [DynamicField](https://react-hook-form.com/api/usefieldarray)
  - Setvalue on ReactHookForm[setValue](https://react-hook-form.com/api/useform/setvalue)

# Paddle

- [] Need to do it later after deploying webpage

- for paying and buying thigns providing[Paddle](https://vendors.paddle.com/onboarding/steps/welcome)
- Sign in with Sass,and No new revenue !

- On their homepage they suggest Catalog
  - Products "for paying once to use "
  - Subscription Plan "for Paying everysigle creteria cycle"

# Order Page

- Share the dish component with owner and client
- give one more props for checking owner or client

- keep in mind the dish page is shared on owner and client
- when you pass the props have to configure those cases

# Order Page RealTime

- Setting SubsCriptions npm install subscriptions-transport-ws(Defends on your backend "graphql-ws or this one")[Check here](https://www.apollographql.com/docs/react/data/subscriptions/#choosing-a-subscription-library)
