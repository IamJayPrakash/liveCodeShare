'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Calendar, Clock, User, ChevronLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';

export function BlogSection() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedPost = blogPosts.find((p) => p.id === selectedId);

    // Embla Carousel Setup
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

    // Auto-scroll effect
    useEffect(() => {
        if (!emblaApi) return;

        const interval = setInterval(() => {
            // Only auto-scroll if no modal is open
            if (!selectedId) {
                emblaApi.scrollNext();
            }
        }, 5000); // Scroll every 5 seconds

        return () => clearInterval(interval);
    }, [emblaApi, selectedId]);


    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="py-24 bg-muted/20 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
                        >
                            Connect. Learn. <span className="text-primary">Evolve.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-lg text-muted-foreground"
                        >
                            Explore our curated library of JavaScript interview questions, modern hooks cheatsheets, and coding trends.
                        </motion.p>
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full">
                            <ChevronLeft size={20} />
                        </Button>
                        <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full">
                            <ChevronRight size={20} />
                        </Button>
                    </div>
                </div>

                {/* Embla Carousel Viewport */}
                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex -ml-6 py-4">
                        {blogPosts.map((post, index) => (
                            <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-6 min-w-0" key={post.id}>
                                <Card post={post} index={index} onClick={() => setSelectedId(post.id)} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <AnimatePresence>
                {selectedId && selectedPost && (
                    <BlogModal post={selectedPost} onClose={() => setSelectedId(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}

function Card({ post, index, onClick }: { post: BlogPost; index: number; onClick: () => void }) {
    return (
        <motion.div
            layoutId={`card-${post.id}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group cursor-pointer rounded-3xl bg-card border border-border/50 overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
        >
            <motion.div
                layoutId={`image-${post.id}`}
                className={`h-48 w-full ${post.image} relative p-6 flex flex-col justify-between`}
            >
                <div className="flex justify-between items-start">
                    <span className="px-3 py-1 text-xs font-semibold bg-black/20 text-white rounded-full backdrop-blur-md border border-white/10">
                        {post.tags[0]}
                    </span>
                </div>
                <div className="text-white/90 text-sm font-medium flex items-center gap-2 drop-shadow-md">
                    <Calendar size={14} /> {post.date}
                </div>
            </motion.div>

            <div className="p-6 flex flex-col flex-1">
                <motion.h3
                    layoutId={`title-${post.id}`}
                    className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2"
                >
                    {post.title}
                </motion.h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
                    {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    <span className="flex items-center gap-1 text-primary font-medium group-hover:translate-x-1 transition-transform">
                        Read more <ChevronRight size={12} />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

function BlogModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />

            <motion.div
                layoutId={`card-${post.id}`}
                className="w-full max-w-4xl h-[85vh] bg-background rounded-2xl shadow-2xl overflow-hidden relative z-50 flex flex-col border border-border/50 ring-1 ring-black/5"
            >
                {/* Mac-style Window Header */}
                <div className="h-12 bg-muted/30 border-b flex items-center px-4 justify-between shrink-0 bg-background/50 backdrop-blur-md z-40">
                    <div className="flex gap-2">
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-sm cursor-pointer group flex items-center justify-center">
                            <X size={8} className="text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground opacity-50 flex-1 text-center font-medium">
                        livecodeshare.app / blog / {post.id}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar bg-card">
                    <motion.div
                        layoutId={`image-${post.id}`}
                        className={`h-72 ${post.image} w-full relative p-8 flex flex-col justify-end`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                        <div className="relative z-10 w-full max-w-3xl mx-auto">
                            <motion.h2
                                layoutId={`title-${post.id}`}
                                className="text-3xl md:text-5xl font-bold mb-6 text-foreground drop-shadow-sm"
                            >
                                {post.title}
                            </motion.h2>

                            <div className="flex flex-wrap gap-4 text-sm font-medium text-foreground/80">
                                <span className="px-3 py-1 bg-background/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 shadow-sm">
                                    <User size={14} /> {post.author}
                                </span>
                                <span className="px-3 py-1 bg-background/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 shadow-sm">
                                    <Calendar size={14} /> {post.date}
                                </span>
                                <span className="px-3 py-1 bg-background/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 shadow-sm">
                                    <Clock size={14} /> {post.readTime}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="p-8 md:p-12 max-w-3xl mx-auto">
                        <div
                            className="prose dark:prose-invert prose-lg max-w-none 
                            prose-headings:font-bold prose-h3:text-2xl prose-h3:mt-8 
                            prose-p:text-muted-foreground prose-p:leading-8
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                            prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div className="my-16 p-8 border rounded-2xl bg-gradient-to-br from-muted/50 to-background shadow-lg text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16" />
                            <div className="relative z-10">
                                <p className="text-muted-foreground mb-4 font-medium">Ready to put this into practice?</p>
                                <h3 className="text-2xl font-bold mb-6">Start coding instantly with our live editor</h3>
                                <Button size="lg" onClick={onClose} className="rounded-full px-8 text-md h-12 shadow-lg hover:shadow-primary/20 transition-all">
                                    Launch Editor
                                    <ChevronRight size={18} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
