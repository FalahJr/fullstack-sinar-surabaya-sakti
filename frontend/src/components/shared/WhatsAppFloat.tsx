import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/constants/company";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="wa-float"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
