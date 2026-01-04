/**
 * LanguageBadge Component
 * 
 * Displays an icon for a programming language with appropriate color.
 * Used in language selectors and UI elements to visually represent languages.
 * 
 * @module LanguageBadge
 */

import React from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiSharp,
  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiSwift,
  SiKotlin,
  SiScala,
  SiR,
  SiOpenjdk,
} from 'react-icons/si';
import { cn } from '@/lib/utils';

/**
 * Language icon and color configuration
 * Maps language IDs to their respective icons and brand colors
 */
const LANGUAGE_ICONS = {
  javascript: { icon: SiJavascript, color: 'text-yellow-400' },
  typescript: { icon: SiTypescript, color: 'text-blue-500' },
  python: { icon: SiPython, color: 'text-yellow-300' },
  java: { icon: SiOpenjdk, color: 'text-red-500' },
  cpp: { icon: SiCplusplus, color: 'text-blue-600' },
  c: { icon: SiCplusplus, color: 'text-blue-700' },
  csharp: { icon: SiSharp, color: 'text-purple-500' },
  go: { icon: SiGo, color: 'text-cyan-400' },
  rust: { icon: SiRust, color: 'text-orange-600' },
  php: { icon: SiPhp, color: 'text-indigo-500' },
  ruby: { icon: SiRuby, color: 'text-red-600' },
  swift: { icon: SiSwift, color: 'text-orange-500' },
  kotlin: { icon: SiKotlin, color: 'text-purple-600' },
  scala: { icon: SiScala, color: 'text-red-700' },
  r: { icon: SiR, color: 'text-blue-500' },
};

/**
 * Props interface for LanguageBadge
 */
interface LanguageBadgeProps {
  /** Programming language identifier */
  language: keyof typeof LANGUAGE_ICONS;
  /** Icon size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * LanguageBadge Component
 * 
 * Renders a colored icon representing a programming language.
 * 
 * @param {LanguageBadgeProps} props - Component props
 * @returns {JSX.Element} Language icon
 */
export const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language, size = 'md' }) => {
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
};
