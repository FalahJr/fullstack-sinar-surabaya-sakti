import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { companyInfo } from "@/constants/company";
import { routes } from "@/config/routes";

/** Server component footer — content statis dari constants */
export function Footer() {
  return (
    <footer id="site-footer" className="footer-bg text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-10 h-10 rounded-sm flex items-center justify-center font-extrabold text-white text-lg"
                style={{ background: "var(--color-primary)" }}
              >
                S
              </span>
              <span className="font-bold text-sm">SINAR SURABAYASAKTI</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Agen dan distributor kabel SUPREME yang melayani kebutuhan
              kelistrikan dan telekomunikasi sejak 1992, didukung oleh PT SUCACO
              Tbk.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link
                  href={routes.about}
                  className="link-underline hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={routes.companyProfile}
                  className="link-underline hover:text-white transition-colors"
                >
                  Company Profile
                </Link>
              </li>
              <li>
                <Link
                  href={routes.visionMission}
                  className="link-underline hover:text-white transition-colors"
                >
                  Vision &amp; Mission
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link
                  href={routes.productsByCategory("kabel-listrik")}
                  className="link-underline hover:text-white transition-colors"
                >
                  Electrical Cable
                </Link>
              </li>
              <li>
                <Link
                  href={routes.productsByCategory("kabel-telekomunikasi")}
                  className="link-underline hover:text-white transition-colors"
                >
                  Telecommunication Cable
                </Link>
              </li>
              <li>
                <Link
                  href={routes.products}
                  className="link-underline hover:text-white transition-colors"
                >
                  Product Catalog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  {companyInfo.address.line1}, {companyInfo.address.line2},{" "}
                  {companyInfo.address.line3}
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{companyInfo.phones[0]}</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{companyInfo.email}</span>
              </li>
              <li className="flex gap-2">
                <MessageCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{companyInfo.whatsappNumber}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} PT Sinar Surabayasakti. All Rights
            Reserved.
          </p>
          <p>
            Distributor resmi kabel SUPREME &mdash; didukung oleh PT SUCACO Tbk.
          </p>
        </div>
      </div>
    </footer>
  );
}
