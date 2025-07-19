import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import { ChevronRight, Users, Zap, Shield, Code, Cpu, Bot, Wrench } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleLoginClick = () => {
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">NESLOGIX</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Welcome, {user.email?.split('@')[0]}</span>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button onClick={handleLoginClick} size="sm">
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Innovative Educational
            <span className="text-primary block">Technology Solutions</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Leading provider of embedded systems, robotics, IoT, and AI solutions for universities, colleges, and schools nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NESLOGIX?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ISO 9001:2015 Certified Company delivering top-tier educational technology solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">ISO Certified</h3>
                <p className="text-muted-foreground">Quality assured with ISO 9001:2015 certification for reliable educational solutions.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cutting-Edge Technology</h3>
                <p className="text-muted-foreground">Expertise in robotics, AI, IoT, and embedded systems for modern education.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nationwide Reach</h3>
                <p className="text-muted-foreground">Serving educational institutions across the country with dedicated support.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for educational technology needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <Code className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">DIY Robotic Kits</h3>
              <p className="text-sm text-muted-foreground">Custom designed educational robotics kits</p>
            </div>
            
            <div className="text-center p-6">
              <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Electronic Design</h3>
              <p className="text-sm text-muted-foreground">Professional electronic product design services</p>
            </div>
            
            <div className="text-center p-6">
              <Cpu className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">PCB Design</h3>
              <p className="text-sm text-muted-foreground">Advanced PCB design and prototyping</p>
            </div>
            
            <div className="text-center p-6">
              <Wrench className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Manufacturing</h3>
              <p className="text-sm text-muted-foreground">Complete manufacturing solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Education?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of educational institutions already using our innovative technology solutions.
          </p>
          {!user ? (
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8"
              onClick={handleLoginClick}
            >
              Get Started Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Access Dashboard
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cpu className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">NESLOGIX</span>
              </div>
              <p className="text-muted-foreground">
                Innovative Educational Technology Company specializing in embedded systems, robotics, and AI solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-foreground transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: info@neslogix.com</p>
                <p>Phone: +91 XXXX XXXXXX</p>
                <p>ISO 9001:2015 Certified</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 NESLOGIX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
