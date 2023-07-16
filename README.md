1. To run this project on local environment
   1. run `npm i`
   2. then run `npm run dev`

2. Features:
   1. Displays paginated users list, uses Infinite loading concept.
   2. Can sort the loaded data by name(default sorting), total no of impressions, conversions and revenue
   3. Newly added card transitions from light green to white background, so that it is clear where those new cards are being added in the list.
   4. Code splitting and lazy loading is being used to enhance experience
   5. Custom hooks have been utilized. `useDynamicImport`, `useInfiniteLoading` and `useWindowDimensions` are example of reusable hooks. `useCardsList` this is used to abstract away logic for computing list.
   6. Can display custom avatar image(first letter of name) if the avatar url is broken

I was not able to add tests due to time constraint.

