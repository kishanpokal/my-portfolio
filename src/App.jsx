import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { HomeV2 } from "./pages/HomeV2";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Main Homepage: New Clean Editorial Portfolio */}
          <Route index element={<HomeV2 />} />
          <Route path="/v2" element={<HomeV2 />} />
          <Route path="/clean" element={<HomeV2 />} />

          {/* Private Secondary Route: Previous Original Website (Accessed only by direct URL) */}
          <Route path="/classic" element={<Home />} />
          <Route path="/v1" element={<Home />} />
          <Route path="/legacy" element={<Home />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </>
  );
}

export default App;
