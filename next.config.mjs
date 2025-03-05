import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    domains: [
      "ipxy.io",
      "scontent-bos5-1.cdninstagram.com",
      "encrypted-tbn0.gstatic.com",
      "img1.wikia.nocookie.net",
      "i.pinimg.com",
      "tribe-s3-production.imgix.net",
      "cdn.iframe.ly",
      "upload.wikimedia.org",
      "cdn.britannica.com",
      "img.freepik.com",
      "static.vecteezy.com",
      "www.msruas.ac.in",
      "www.therobotreport.com",
      "rguktrkv.ac.in",
      "addons-media.operacdn.com",
      "flagcdn.com",
      "storage.googleapis.com",
      "i.natgeofe.com",
      "static.wikia.nocookie.net",
      "esports.ch",
      "events.avisengine.com",
      "canada.firaworldcup.org",
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
