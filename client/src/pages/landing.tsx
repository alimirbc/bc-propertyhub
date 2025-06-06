import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  CheckCircle, 
  DollarSign, 
  Users, 
  Building, 
  BarChart3, 
  Smartphone,
  Shield,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";

export default function Landing() {
  const handleGetStarted = () => {
    window.location.href = "/api/login";
  };

  const handleWatchDemo = () => {
    // Demo functionality can be implemented later
    console.log("Demo requested");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">BC PropertyHub</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                <Button onClick={handleGetStarted} className="bg-primary text-white hover:bg-blue-700">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="mb-6">
                <Badge className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Shield className="w-4 h-4 mr-2" />
                  RTB Compliant for BC
                </Badge>
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block">Professional Property</span>
                <span className="block text-primary">Management Platform</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Streamline your rental business with BC PropertyHub. Complete landlord and tenant management, automated RTB compliance, tenant screening, and financial tracking - all in one powerful platform.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleGetStarted}
                    className="w-full sm:w-auto bg-primary text-white px-8 py-3 hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Start Free Trial
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleWatchDemo}
                    className="w-full sm:w-auto border-gray-300 text-gray-700 px-8 py-3 hover:bg-gray-50 transition-colors"
                  >
                    Watch Demo
                  </Button>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  14-day free trial • No credit card required • Cancel anytime
                </p>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-2xl lg:max-w-md">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern property management dashboard interface" 
                  className="w-full rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Trusted by Property Managers Across BC</p>
            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <span className="text-lg font-bold text-gray-900">500+</span>
                  <p className="text-sm text-gray-600">Properties Managed</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <span className="text-lg font-bold text-gray-900">98%</span>
                  <p className="text-sm text-gray-600">RTB Compliance</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <span className="text-lg font-bold text-gray-900">$2M+</span>
                  <p className="text-sm text-gray-600">Rent Collected</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 text-center">
                  <span className="text-lg font-bold text-gray-900">24/7</span>
                  <p className="text-sm text-gray-600">Support</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to manage properties professionally
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              From tenant screening to financial reporting, BC PropertyHub handles every aspect of property management.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">RTB Compliance</h3>
                  <p className="text-gray-500">Automated BC Residential Tenancy Branch compliance with built-in legal forms, notices, and documentation.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Management</h3>
                  <p className="text-gray-500">Track income, expenses, and ROI with CRA-compliant reporting and automated rent collection through Stripe.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tenant Screening</h3>
                  <p className="text-gray-500">Comprehensive background checks, credit reports, and reference verification to find quality tenants.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Property Management</h3>
                  <p className="text-gray-500">Centralized dashboard for all properties, maintenance requests, and tenant communications.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics & Reporting</h3>
                  <p className="text-gray-500">Detailed insights on property performance, vacancy rates, and revenue optimization.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border border-gray-100">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Mobile Access</h3>
                  <p className="text-gray-500">Full-featured mobile app for managing properties on-the-go with offline capabilities.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Choose the plan that works for your property portfolio size.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Starter Plan */}
            <Card className="shadow-md border border-gray-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">Starter</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">$39</span>
                    <span className="text-base font-medium text-gray-500">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Perfect for new landlords</p>
                </div>
                <ul className="mt-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Up to 5 properties</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Basic RTB compliance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Rent collection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Email support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button onClick={handleGetStarted} className="w-full bg-primary text-white hover:bg-blue-700">
                    Start Free Trial
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Professional Plan (Popular) */}
            <Card className="shadow-lg border-2 border-primary relative">
              <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                <div className="flex justify-center">
                  <Badge className="px-4 py-1 bg-primary text-white">
                    Most Popular
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">Professional</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">$89</span>
                    <span className="text-base font-medium text-gray-500">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">For growing portfolios</p>
                </div>
                <ul className="mt-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Up to 25 properties</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Full RTB compliance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Tenant screening</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Financial reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Priority support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button onClick={handleGetStarted} className="w-full bg-primary text-white hover:bg-blue-700">
                    Start Free Trial
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="shadow-md border border-gray-200">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">Enterprise</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">$129</span>
                    <span className="text-base font-medium text-gray-500">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">For large portfolios</p>
                </div>
                <ul className="mt-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Unlimited properties</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Advanced automation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">API access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm text-gray-700">Dedicated support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to streamline your property management?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
              Join hundreds of BC landlords who trust PropertyHub to manage their rental properties professionally and profitably.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleGetStarted}
                className="bg-white text-primary px-8 py-3 hover:bg-gray-50 shadow-lg"
              >
                Start Free 14-Day Trial
              </Button>
              <Button 
                variant="outline"
                onClick={handleWatchDemo}
                className="border-white text-white px-8 py-3 hover:bg-white hover:text-primary"
              >
                Schedule Demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-blue-100">
              No credit card required • Cancel anytime • Full support included
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-white">BC PropertyHub</span>
              </div>
              <p className="text-gray-400 text-base">
                Professional property management platform designed specifically for British Columbia's rental market.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Features</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Pricing</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Integrations</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">API</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Documentation</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Status</a></li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Partners</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Security</a></li>
                    <li><a href="#" className="text-base text-gray-300 hover:text-white">Compliance</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2024 BC PropertyHub. All rights reserved. Built for British Columbia landlords and tenants.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
