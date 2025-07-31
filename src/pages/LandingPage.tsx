import React from "react";
import LandingPageHeader from "@/components/Header/LandingPageHeader";
import Footer from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  MessageCircle, 
  Award, 
  HelpCircle,
  Play,
  FileText,
  Clock
} from "lucide-react";

const LandingPage: React.FC = () => {
  const examCategories = [
    {
      title: "GATE / NET",
      description: "Graduate Aptitude Test in Engineering & National Eligibility Test",
      icon: <GraduationCap className="h-12 w-12 text-primary" />,
      courses: "25+ Courses"
    },
    {
      title: "IIT-JAM",
      description: "Joint Admission Test for MSc Programs",
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      courses: "15+ Courses"
    },
    {
      title: "UPSC-GSI",
      description: "Geological Survey of India & Civil Services",
      icon: <Award className="h-12 w-12 text-primary" />,
      courses: "20+ Courses"
    }
  ];

  const features = [
    { 
      icon: <Play className="h-8 w-8 text-primary" />, 
      title: "Live Classes", 
      desc: "Engage with instructors in real-time sessions." 
    },
    { 
      icon: <MessageCircle className="h-8 w-8 text-primary" />, 
      title: "Discussion Forum", 
      desc: "Collaborate and discuss topics with peers." 
    },
    { 
      icon: <FileText className="h-8 w-8 text-primary" />, 
      title: "Quizzes & Assignments", 
      desc: "Test your knowledge and track progress." 
    },
    { 
      icon: <HelpCircle className="h-8 w-8 text-primary" />, 
      title: "Doubt Resolution", 
      desc: "Get your queries answered quickly." 
    },
    { 
      icon: <Award className="h-8 w-8 text-primary" />, 
      title: "Certification", 
      desc: "Earn certificates to showcase your skills." 
    },
    { 
      icon: <Users className="h-8 w-8 text-primary" />, 
      title: "Community Support", 
      desc: "Join a vibrant community of geology enthusiasts." 
    },
  ];

  const testimonials = [
    { 
      text: "The live classes and comprehensive quizzes helped me ace my GATE exam!", 
      author: "Priya Sharma",
      exam: "GATE Geology"
    },
    { 
      text: "The discussion forum is amazing – I got my doubts cleared within minutes.", 
      author: "Rahul Kumar",
      exam: "NET Geology"
    },
    {
      text: "Excellent course structure and amazing faculty support throughout my preparation.",
      author: "Anjali Patel",
      exam: "IIT-JAM"
    },
    {
      text: "The study materials and mock tests were incredibly helpful for UPSC preparation.",
      author: "Vikash Singh",
      exam: "UPSC-GSI"
    }
  ];

  return (
    <>
      {/* Header */}
      <LandingPageHeader isLoggedIn={false} />

      {/* Hero Section */}
      <section className="relative bg-gradient-primary py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-primary-foreground">
            One Stop Destination for Geology Preparation
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Join thousands of learners mastering GATE, NET, and UPSC Geological Sciences with our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="What do you want to learn today?"
              className="flex-1 h-12 bg-background text-foreground"
            />
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Search Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary">5000+</h3>
              <p className="text-muted-foreground">Students Enrolled</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">60+</h3>
              <p className="text-muted-foreground">Expert Instructors</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">200+</h3>
              <p className="text-muted-foreground">Live Classes</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">95%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Categories */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Our Exam Prep Categories
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Choose your path to geological excellence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {examCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Badge variant="secondary">{category.courses}</Badge>
                  <Button className="w-full mt-4" variant="outline">
                    Explore Courses
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Platform Features
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Everything you need for successful exam preparation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Success stories from our geology achievers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <p className="text-lg italic mb-4">"{testimonial.text}"</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.exam}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join us today and take the first step towards geological excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary">
              Sign Up Now
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              View Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default LandingPage;