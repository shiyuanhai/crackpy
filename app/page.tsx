import App from "@/components/App";
import { LocaleProvider } from "@/lib/locale-context";

export default function Home() {
  return (
    <LocaleProvider>
      <App />
    </LocaleProvider>
  );
}
