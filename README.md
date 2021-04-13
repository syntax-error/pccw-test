# JS Assessment

This will assess your familiarity with vanilla Javascript. It will mainly test your ability and understanding working with collections.

It will cover the following concepts:

- built in array methods for iteration
- iteration techniques for including / excluding / changing data
- hash maps / lookup tables
- higher order functions / first class functions
- type safety
- object equality, compare by reference vs value

**Requirements**

- You are not allowed to use any libraries in your solutions
- You are not allowed to modify the test file, only `./index.js`
- es6+/es2015+ is preferred, but you will not be penalised for using es5

**What to do**

- install with `npm install --production`
- Fill out `./index.js` to make the tests in `__tests__/index.js` pass
- Run the tests once with `npm run test`
- Run the tests continuously with `npm run test:watch` while you develop

**Scoring**

- Each problem has an associated score. You can get partial points even if your solution does not pass the test.
- If you're struggling with finding a solution, try and add comments explaining your approach, as this
  can earn you points as well

**Assessment Criteria**

- Declarative solutions are preferred over imperative ones
- Try to avoid introducing local variables unless required
- Clean, readable solutions are preferred over performant ones. No need to optimise prematurely.
- New data is preferred over mutations, unless otherwise specified in the problem description

### Problem 1 - stripPrivateProperties - 2 points

Given an array of objects, create a new array where the objects inside don't include the supplied
properties.

Note: object mutation is fine here.

> Since object mutation was fine here, I chose to do the simpler method of simply iterating through
> the objects and using `delete` on each key.

### Problem 2 - excludeByProperty - 2 points

Given an array of objects, create a new array which excludes objects based on a supplied property.

> I chose to use the `hasOwnProperty` interpretation for excluding objects. This means we
> do exclude things even if the property is set to null or undefined; but not things that
> are part of the prototype; because filtering things for `toString` seemed silly.
> 
> I also chose to add a bit of optional chaining, figuring that things that don't exist or
> aren't an object deserve to get filtered out too.

### Problem 3 - sumDeep - 3 points

Compute sums based on deep properties.

> This was easily the most complex solution I created. The easy option was to assume that
> every given set of inputs would be like the test (i.e. an array of objects with an `objects` prop
> tht has contains an array of objects with a `val` prop that needs summing, etc).
> 
> I chose a more involved method where I assumed that I was to create a sum for each prop, in each
> object in the given array. I still assumed the values I was supposed to sum had to be arrays of
> objects with `val` props. I also assumed that anything in those arrays that weren't an object
> with `val` were equal to zero. Top level items that weren't an array simply copied over.

### Problem 4 - applyStatusColor - 4 points

Create a function which creates an array of objects where
each object includes its matching status code. The association between
colors and status codes are supplied as the first argument where
the keys identify the colors, and the values are arrays of status codes matching the color.
You can assume that a status code can only belong to one color.

Constraints

- Since there are so many status codes - we want a scalable solution, so you are not allowed to use `if` or `switch` statements
  to find the appropriate color.
- If making tradeoffs between space and time here, optimise for time

> I made this fairly simple. For each statusObject, find key associated with the array that contains
> its status code. Then make an object with `color: key` and `status: statusObject.status`. If I
> didn't find a colour, skip it.
> 
> Instead of a `find` and `includes`, I could have made a dictionary out of the codeColors instead.
> The find option probably requires fewer accesses for short lists of statuses, and the dictionary
> becomes better once you need to start processing dozens or hundreds. Unless you're getting to huge
> amounts of codes and colors, its much of a muchness considering modern computing power, and the
> optimisation of Array methods


### Problem 5 - createGreeting - 2 points

Figure out what to do from the test.

> Obviously this is making a function generator that applies preset values to a given function
> and returns a function ready to be passed the remaining args. The way the test is structured, 
> its implied that one preset will be passed to the generator, and one argument will be passed
> to the generated function.
> 
> I went the extra step and let any number of arguments be passed to either.

### Problem 6 - setDefaults - 3 points

Create a function which adds default properties to an object if necessary

> Since this uses the word "adds", I interpreted this as "okay to mutate". In opposition to the
> `hasOwnProperty` used in Problem 2, I purposely chose to overwrite keys that were set as undefined
> but not keys that were null. 
> 
> Since JS has `undefined` and `null`, which basically mean the same thing, I usually opt for
> exclusively using `undefined` in my code, since JS defaults to using it. However, in the event
> that one wants to make a distinction between "not set" and "set as nothing", `undefined` and
> `null` are a reasonable option. I thought I'd show off a bit by actively acknowledging the 
> difference 

### Problem 7 - fetchUserByNameAndUsersCompany - 5 points

Create a function that fetches a user by name, the user's company and a status.

- The services to fetch the data are given and can be located in `./__tests__/__helpers__/p7.js`
- We want the data to be returned as fast as possible

> To save time, I fetched status and users at the same time. I'm curious if this is a point of
> failure though, since I'm fetching company afterwards and that could cause a small delay between
> fetching and returning. Additionally, I would think that retrieving the status would be the last
> thing to do, so it's the most accurate.
> 
> I could probably save a teeny tiny more amount of time by fetching all the companies in parallel
> with the other calls. But that scaling gets out of hand very quickly, and raises all sorts of 
> concerns about throwing superfluous data to the client.