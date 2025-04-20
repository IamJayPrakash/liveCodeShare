"use client";
import { toast as showToast } from "sonner";

const toast = ({ title, description, variant = "default" }) => {
  showToast(title, {
    description,
    variant,
  });
};

const useToast = () => {
  return { toast };
};

export { useToast, toast };
