/* ═══════════════════════════════════════════════════════════════════════════
   UI COMPONENTS — Barrel Export
   Import from '@/components/ui' for all design system components
   ═══════════════════════════════════════════════════════════════════════════ */

// Button
export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";

// Card
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  ProductCard,
} from "./card";

// Form inputs
export {
  Label,
  HelpText,
  Input,
  Textarea,
  Select,
  FormField,
} from "./input";

// Badge & Chip
export {
  Badge,
  badgeVariants,
  Chip,
  CategoryBadge,
  StatusBadge,
} from "./badge";
export type { CategoryType, StatusType } from "./badge";

// Layout primitives
export {
  Container,
  Section,
  SectionHeader,
  Grid,
  Stack,
  Divider,
} from "./layout";

// Language
export {
  LanguageProvider,
  LanguageToggle,
  useLanguage,
} from "./language-toggle";

// Icons
export {
  WhatsAppIcon,
  FacebookIcon,
  MenuIcon,
  CloseIcon,
  ChevronRightIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
} from "./icons";
