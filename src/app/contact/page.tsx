"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mail, MessageSquare, Github } from 'lucide-react';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    submitting: false,
    submitted: false,
    error: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, submitting: true }));
    
    // This is where you would normally handle form submission to your backend
    // For this example, we'll just simulate a successful submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormState(prev => ({ 
        ...prev, 
        submitting: false,
        submitted: true
      }));
    } catch (error) {
      console.error("Error during form submission:", error);
      setFormState(prev => ({ 
        ...prev, 
        submitting: false,
        error: true
      }));
    }
  };

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      message: '',
      submitting: false,
      submitted: false,
      error: false
    });
  };

  return (
    <AppLayout>
      <Header userCount={0} />
      
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground">
                Have questions or feedback? We&apos;d love to hear from you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formState.submitted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-6 space-y-4"
                    >
                      <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                        <Send className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                      </p>
                      <Button onClick={resetForm} variant="outline" className="mt-2">
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formState.message}
                          onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={formState.submitting}
                      >
                        {formState.submitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={16} className="ml-2" />
                          </>
                        )}
                      </Button>
                      
                      {formState.error && (
                        <p className="text-sm text-destructive mt-2">
                          There was an error sending your message. Please try again.
                        </p>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Other Ways to Connect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">
                      <a 
                        href="mailto:info@livecodeshare.com" 
                        className="text-primary hover:underline"
                      >
                        info@livecodeshare.com
                      </a>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Github size={16} />
                      <a 
                        href="https://github.com/iamjayprakash/livecodeshare" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        github.com/iamjayprakash/livecodeshare
                      </a>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Response Time</h3>
                    <p className="text-muted-foreground">
                      We typically respond to inquiries within 24-48 hours during business days.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Found a bug?</h3>
                    <p className="text-muted-foreground mb-4">
                      Please report issues directly on our GitHub repository for faster resolution.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <a 
                        href="https://github.com/iamjayprakash/livecodeshare/issues" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Report Issue
                        <Github size={16} className="ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </AppLayout>
  );
}