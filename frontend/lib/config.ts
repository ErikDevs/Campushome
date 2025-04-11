const config = {
  env: {
    apiEndpoint: process.env.API_ENDPOINT!,
    databaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.NEXT_IMAGEKIT_PRIVATE_KEY!,
    },
  },
};

export default config;
