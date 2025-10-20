import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
	// Silence workspace root warning and ensure correct project root for Turbopack
	turbopack: {
		root: path.resolve(__dirname),
	},
};

export default nextConfig;
