import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; subject: string; message: string }) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    },
    onError: (error) => {
      console.error("Contact form error:", error);
      // Fallback to mailto
      const mailtoLink = `mailto:brainimmensity@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoLink;
      
      toast({
        title: "Opening Email Client",
        description: "Your default email client should open with the message pre-filled.",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate({ name, email, subject, message });
  };

  return (
    <section className="py-16 px-4 bg-secondary" id="contact">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Get In Touch</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold mb-6">Contact Information</h4>
            
            <div className="flex items-center space-x-4" data-testid="contact-email">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <img src="https://img.icons8.com/ios-filled/24/ffffff/mail.png" alt="Email" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-secondary-foreground">brainimmensity@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4" data-testid="contact-whatsapp">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <img src="https://img.icons8.com/ios-filled/24/ffffff/whatsapp.png" alt="WhatsApp" />
              </div>
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-secondary-foreground">+91 80904 41419</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4" data-testid="contact-location">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <img src="https://img.icons8.com/ios-filled/24/ffffff/marker.png" alt="Location" />
              </div>
              <div>
                <p className="font-medium">Office</p>
                <p className="text-secondary-foreground">Digital India Hub, New Delhi</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="glass-effect">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} data-testid="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-secondary border-border"
                    required
                    data-testid="input-contact-name"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary border-border"
                    required
                    data-testid="input-contact-email"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-secondary border-border mb-4"
                  required
                  data-testid="input-contact-subject"
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-secondary border-border mb-6"
                  required
                  data-testid="textarea-contact-message"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-105"
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
