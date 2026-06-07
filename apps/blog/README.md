# Blog Studio

This is the separate Sanity Studio app for writing and managing blog posts.

From the repository root:

```sh
pnpm blog:dev
pnpm blog:deploy
```

Or directly from this app:

```sh
pnpm --filter @obiabo/blog dev
pnpm --filter @obiabo/blog deploy
```

`pnpm blog:deploy` publishes the Studio remotely through Sanity so it can be opened in a browser and used to write posts.

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- Check out the example frontend: [React/Next.js](https://github.com/sanity-io/tutorial-sanity-blog-react-next)
- [Read the blog post about this template](https://www.sanity.io/blog/build-your-own-blog-with-sanity-and-next-js?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
