# Convertage

This is a Next.js project that allows you to convert images to different formats. Also, this projects is deployed
on [vercel](https://vercel.com/) here is [demo](https://convertage.vercel.app/). By vercel on demo you will have
limitations on file size and files quantity peer time, but you can run this project locally and convert any size and quantity
of images peer time. Also, locally you can save history of changes by telegram bot.

## Scripts

Here are the scripts you can run:

```npm run dev``` - Run development mode

```npm run build``` - Build the application

```npm run start``` - Run production mode, be sure to run `npm run build` first

```npm run lint```: This script will run ESLint on all `.ts` and `.tsx` files and automatically fix any issues it can.

```npm run format```: This script will run Prettier on all `.tsx`, `.ts`, `.css`, and `.scss` files in the `src`
and `app` directories.

## Development

To start developing in this project:

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Create environments before starting developing. (Provide instructions on how to do this)
 - Create `.env.local` file in the root of the project.
 - Add `TELEGRAM_BOT_TOKEN` to the `.env.local` file. You can add chat id on home webpage. 

## License

[MIT](https://choosealicense.com/licenses/mit/)
