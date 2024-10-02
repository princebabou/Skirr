import React from 'react';
import Link from 'next/link';
import { ArrowRight, Book, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-gray-800 dark:text-white">
      <div className="text-center max-w-4xl px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Skirr Blog</span>
        </h1>
        <p className="text-xl sm:text-2xl mb-12 leading-relaxed text-gray-600 dark:text-gray-300">
          Dive into a world of cutting-edge insights, captivating stories, and groundbreaking innovations. 
          Join our thriving community of visionaries and change-makers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Get Started
            <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
          <a 
            href="/about" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-white text-indigo-600 hover:bg-indigo-50 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700"
          >
            Learn More
          </a>
        </div>
      </div>
      <div id="features" className="mt-24 w-full max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Why Choose Skirr Blog?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Insightful Content', description: 'Immerse yourself in thought-provoking articles crafted by renowned industry experts.', icon: Book },
            { title: 'Diverse Topics', description: 'Explore a rich tapestry of subjects, from cutting-edge tech trends to boundless creative inspiration.', icon: Zap },
            { title: 'Engaging Community', description: 'Connect with brilliant minds and participate in stimulating discussions in our vibrant community.', icon: Users },
          ].map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <feature.icon className="h-12 w-12 mb-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}