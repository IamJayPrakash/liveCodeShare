import React from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiCplusplus,
  SiSharp,
  SiGo,
  SiRust,
  SiOpenjdk,
} from 'react-icons/si';
import { cn } from '@/lib/utils';

const LANGUAGE_ICONS = {
  javascript: { icon: SiJavascript, color: 'text-yellow-400' },
  typescript: { icon: SiTypescript, color: 'text-blue-500' },
  python: { icon: SiPython, color: 'text-yellow-300' },
  html: { icon: SiHtml5, color: 'text-orange-500' },
  css: { icon: SiCss3, color: 'text-blue-400' },
  java: { icon: SiOpenjdk, color: "text-red-500" },
  cpp: { icon: SiCplusplus, color: 'text-blue-600' },
  csharp: { icon: SiSharp, color: 'text-green-500' },
  go: { icon: SiGo, color: 'text-cyan-400' },
  rust: { icon: SiRust, color: 'text-orange-600' },
};

export function LanguageBadge({
  language,
  size = 'md',
}: Readonly<{ language: keyof typeof LANGUAGE_ICONS; size?: 'sm' | 'md' | 'lg' }>) {
  const langInfo = LANGUAGE_ICONS[language] || {
    icon: SiJavascript,
    color: 'text-gray-400',
  };
  const Icon = langInfo.icon;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return <Icon className={cn(langInfo.color, sizeClasses[size])} />;
}
