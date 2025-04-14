import { Link } from "react-router-dom";
import {
  DatabaseIcon,
  FileIcon,
  ArrowRightLeftIcon,
  CloudIcon,
  BarChartIcon,
  Headphones,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  ChevronRight,
  SparkleIcon
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-slate-100">
    <div className="flex items-start mb-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-teal-50 mr-4">
        <Icon className="w-7 h-7 text-indigo-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="relative overflow-hidden bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-teal-400 transform origin-left group-hover:scale-x-100 transition-transform duration-300 scale-x-0" />
    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent mb-2">{number}</div>
    <div className="text-slate-600 font-medium">{label}</div>
  </div>
);

const BenefitItem = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-200">
    <div className="p-2 rounded-lg bg-teal-50">
      <Icon className="w-5 h-5 text-teal-600" />
    </div>
    <span className="text-slate-700 font-medium">{text}</span>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-teal-50/30">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <header className="text-center mb-24 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 leading-tight">
            Data Bridge Blaze
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Transform your data integration experience with lightning-fast bidirectional transfers between ClickHouse and flat files
          </p>
          <Link
            to="/data-flow"
            className="group bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-10 py-5 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Your Data Journey
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
        <StatCard number="10x" label="Faster Than Traditional ETL" />
<StatCard number="99.9%" label="Uptime Reliability" />
<StatCard number="100%" label="Optimized for High Volume" />
<StatCard number="24/7" label="Uptime Guarantee" />

        </div>

        {/* Features Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 font-medium px-4 py-1 rounded-full text-sm mb-4">
              <SparkleIcon className="w-4 h-4 mr-2" /> Features
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Powerful Features for Complex Data Needs
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage, transform, and analyze your data efficiently
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={DatabaseIcon}
              title="ClickHouse Integration"
              description="Connect and transfer data to and from ClickHouse databases with enterprise-grade reliability."
            />
            <FeatureCard
              icon={FileIcon}
              title="Flat File Support"
              description="Support for CSV, JSON, Parquet, and other formats with automatic schema detection."
            />
            <FeatureCard
              icon={ArrowRightLeftIcon}
              title="Bidirectional Flow"
              description="Transfer data seamlessly in both directions with real-time validation and error handling."
            />
            <FeatureCard
              icon={CloudIcon}
              title="Cloud Ready"
              description="Deploy anywhere with cloud-native architecture and scalable performance."
            />
            <FeatureCard
              icon={BarChartIcon}
              title="Real-time Analytics"
              description="Monitor transfers with detailed analytics and customizable dashboards."
            />
            <FeatureCard
              icon={Headphones}
              title="24/7 Support"
              description="Access dedicated customer support round the clock for any issue you face."
            />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-24 rounded-3xl p-12 bg-gradient-to-b from-purple-50 to-purple-100/50 border border-purple-100">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-purple-100 text-purple-800 font-medium px-4 py-1 rounded-full text-sm mb-4">
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Choose Data Bridge Blaze?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-2">
              <BenefitItem icon={Zap} text="Up to 10x faster than traditional ETL solutions" />
              <BenefitItem icon={Shield} text="Enterprise-grade security and encryption" />
              <BenefitItem icon={CheckCircle2} text="99.9% data accuracy guarantee" />
              <BenefitItem icon={Users} text="Collaborative features for team environments" />
            </div>
            <div className="space-y-2">
              <BenefitItem icon={CheckCircle2} text="Zero-configuration setup process" />
              <BenefitItem icon={Shield} text="Automatic backup and recovery" />
              <BenefitItem icon={Zap} text="Real-time data validation and cleansing" />
              <BenefitItem icon={Headphones} text="24/7 expert support, always there for you" />
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-teal-100 text-teal-800 font-medium px-4 py-1 rounded-full text-sm mb-4">
              Our Approach
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Our Data Integration Approach
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparent Methodology",
                desc: "Our open-source migration tools allow you to inspect every step of the process—ensuring transparency and trust."
              },
              {
                title: "Performance Optimization",
                desc: "Efficient compression and smart caching keep system performance optimal at all times."
              },
              {
                title: "Security First",
                desc: "End-to-end encryption and secure logs keep your data safe from source to destination."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-teal-500 opacity-10" />
          <div className="relative bg-gradient-to-r from-indigo-600 to-teal-500 p-16 rounded-3xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Data Flow?
            </h2>
            <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
              Join thousands of companies using Data Bridge Blaze to streamline their data operations
            </p>
            <Link
              to="/data-flow"
              className="group bg-white text-indigo-600 px-10 py-5 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              Start Free Trial
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;