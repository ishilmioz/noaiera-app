const nextConfig = {
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "Referrer-Policy", value: "no-referrer" },
        { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    }];
  },
};
export default nextConfig;
