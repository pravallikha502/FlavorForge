import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TermsOfService = () => {
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
          <FileText className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black">Terms of <span className="text-primary">Service</span></h1>
      </div>

      <div className="max-w-none space-y-12 text-gray-600 dark:text-white">
        <section>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">1. Acceptance of Terms</h2>
          <p className="leading-relaxed text-lg opacity-90">
            By accessing and using FlavorForge, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">2. Use License</h2>
          <p className="leading-relaxed text-lg opacity-90">
            Permission is granted to temporarily use the FlavorForge application for personal, non-commercial transitory viewing only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">3. Disclaimer</h2>
          <p className="leading-relaxed text-lg opacity-90">
            The materials on FlavorForge are provided on an 'as is' basis. FlavorForge makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">4. Limitations</h2>
          <p className="leading-relaxed text-lg opacity-90">
            In no event shall FlavorForge or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use FlavorForge.
          </p>
        </section>

        <p className="pt-8 border-t border-gray-100 dark:border-gray-800 text-sm font-medium">
          Last Updated: May 2026
        </p>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
