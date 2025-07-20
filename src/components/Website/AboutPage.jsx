import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, BookOpen, Star, Users, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-custom mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-marcellus font-bold text-gray-900 mb-6">
            About Layali Dreams
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe every child deserves to be the hero of their own story. 
            Our personalized storybooks create magical moments that last a lifetime.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-marcellus font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Layali Dreams, we create personalized storybooks that make every child feel special, 
                loved, and capable of achieving their dreams. Our stories are more than just books – 
                they're magical experiences that strengthen family bonds and build confidence.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Every story is carefully crafted with beautiful illustrations, engaging narratives, 
                and personal touches that make each book unique to your child.
              </p>
              <Link
                to="/books"
                className="bg-[#7F7FBD] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6F6FAD] transition-colors inline-flex items-center space-x-2"
              >
                <span>Explore Our Stories</span>
                <BookOpen className="h-5 w-5" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-[#7F7FBD] to-[#8F8FCD] rounded-2xl p-8 text-white">
              <div className="text-center">
                <Heart className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-marcellus font-bold mb-4">
                  Why Choose Us?
                </h3>
                <ul className="text-left space-y-3">
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-300" />
                    <span>100% Personalized Content</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-300" />
                    <span>Premium Quality Materials</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-300" />
                    <span>Beautiful Illustrations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-300" />
                    <span>Fast Delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-marcellus font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Creating your personalized storybook is simple and magical
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7F7FBD] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-marcellus font-bold text-gray-900 mb-3">
                Choose Your Story
              </h3>
              <p className="text-gray-600">
                Browse our collection of magical stories and select the perfect adventure for your child
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#7F7FBD] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-marcellus font-bold text-gray-900 mb-3">
                Personalize Details
              </h3>
              <p className="text-gray-600">
                Provide your child's name, characteristics, and any special details to make the story unique
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#7F7FBD] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-marcellus font-bold text-gray-900 mb-3">
                Receive Your Book
              </h3>
              <p className="text-gray-600">
                We create and deliver your personalized storybook, ready to create magical memories
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-marcellus font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-lg text-gray-600">
              Making dreams come true, one story at a time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7F7FBD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Families</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#7F7FBD] rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Unique Stories</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#7F7FBD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#7F7FBD] rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-marcellus font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate storytellers dedicated to creating magical experiences for children worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#7F7FBD] to-[#8F8FCD] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <h3 className="text-xl font-marcellus font-bold text-gray-900 mb-2">
                Sarah Ahmed
              </h3>
              <p className="text-gray-600">Founder & Creative Director</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#7F7FBD] to-[#8F8FCD] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <h3 className="text-xl font-marcellus font-bold text-gray-900 mb-2">
                Mohammed Ali
              </h3>
              <p className="text-gray-600">Lead Illustrator</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#7F7FBD] to-[#8F8FCD] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <h3 className="text-xl font-marcellus font-bold text-gray-900 mb-2">
                Amina Hassan
              </h3>
              <p className="text-gray-600">Story Development</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-[#7F7FBD] to-[#8F8FCD] rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-marcellus font-bold mb-4">
              Ready to Create Your Story?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of families who have created magical memories with our personalized storybooks
            </p>
            <Link
              to="/books"
              className="bg-white text-[#7F7FBD] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Your Adventure</span>
              <BookOpen className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
} 