import { ShieldCheck, Zap, Smartphone } from "lucide-react";

export default function FeatureCards() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="text-primary mb-3">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Secure Conversion</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">All text processing happens directly in your browser. No data is sent to any server.</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="text-primary mb-3">
          <Zap className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Fast Processing</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Convert text instantly with our optimized algorithms. Works with large text blocks efficiently.</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="text-primary mb-3">
          <Smartphone className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Mobile Friendly</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">Use this tool on any device. The responsive design works great on desktop, tablet, and mobile.</p>
      </div>
    </div>
  );
}
