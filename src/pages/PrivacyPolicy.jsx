import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24"
    >
      <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold mb-12 hover:gap-4 transition-all">
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <div className="flex items-center gap-4 mb-12">
        <div className="p-4 bg-primary/10 rounded-3xl">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black">Privacy <span className="text-primary">Policy</span></h1>
      </div>

      <div className="max-w-none space-y-12 text-gray-600 dark:text-white">
        <section>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">1. Information We Collect</h2>
          <p className="leading-relaxed text-lg opacity-90">
            At FlavorForge, we respect your privacy. We do not collect any personal identification information unless you explicitly provide it (for example, through a newsletter subscription). We do store your favorite recipes and meal plans locally in your browser's storage to enhance your experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">2. Local Storage</h2>
          <p className="leading-relaxed text-lg opacity-90">
            FlavorForge uses "Local Storage" to save your favorites, meal plans, and shopping lists. This data remains on your device and is not transmitted to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">3. Third-Party Services</h2>
          <p className="leading-relaxed text-lg opacity-90">
            We use TheMealDB API to provide recipe data. Please note that when you access recipes, you are interacting with third-party content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">4. Updates</h2>
          <p className="leading-relaxed text-lg opacity-90">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>

        <p className="pt-8 border-t border-gray-100 dark:border-gray-800 text-sm font-medium">
          Last Updated: May 2026
        </p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
